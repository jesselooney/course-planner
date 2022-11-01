import Alert from '../types/Alert'
import BooleanStatement from '../types/BooleanStatement'
import Course from '../types/Course'
import CourseID from '../types/CourseID'
import GlobalData from '../types/GlobalData'
import Grade from '../types/Grade'
import GraduationOption from '../types/GraduationOption'
import {
  booleanStatementToString,
  mapBooleanStatement,
  resolveBooleanStatement,
} from './booleanStatement'
import { fullName } from './fullName'
import { hasOwnProperty } from './hasOwnProperty'

export function computeCourseRequirementErrors(data: GlobalData): GlobalData {
  const prerequisiteErrors: Alert[] = []
  for (const [index, selection] of data.courseSelections.entries()) {
    const course = getCourse(data, selection.courseId)
    if (!arePrerequisitesMet(data, course, selection.grade))
      prerequisiteErrors.push({
        id: index,
        message: `${fullName(course)}: ${course.prerequisitesText}`,
        ignored: false,
      })
    // deal with corequisites
  }
  return { ...data, courseRequirementErrors: prerequisiteErrors }
}

export function computeGraduationRequirementErrors(data: GlobalData): GlobalData {
  const gradRequirementErrors: Omit<Alert, 'id'>[] = []
  for (const optionId of data.graduationOptionSelections) {
    const gradOption = getGradOption(data, optionId)
    const graduationCreditErrors = getGraduationCreditErrors(data, gradOption)
    const graduationCourseErrors = getGraduationCourseErrors(data, gradOption)
    gradRequirementErrors.push(...graduationCourseErrors, ...graduationCreditErrors)
  }

  // assign IDs to these errors
  const gradRequirementAlerts: Alert[] = gradRequirementErrors.map((err, index) => ({
    ...err,
    id: index,
  }))

  return { ...data, graduationRequirementErrors: gradRequirementAlerts }
}

function arePrerequisitesMet(data: GlobalData, course: Course, grade: Grade): boolean {
  if (course.prerequisites === undefined) return true

  return resolveBooleanStatement(
    mapBooleanStatement(course.prerequisites, (courseId) => {
      // Among course selections in grades before this course is being taken,
      // is there an instance of this particular prerequisite?
      return (
        data.courseSelections
          .filter((s) => s.grade < grade)
          .find((s) => s.courseId === courseId) !== undefined
      )
    }),
  )
}

function getGraduationCourseErrors(
  data: GlobalData,
  gradOption: GraduationOption,
): Omit<Alert, 'id'>[] {
  const courseReqs = gradOption.courseRequirements
  if (courseReqs === undefined) return []

  // Split up top-level 'all' because each statement can be rendered as a separate Alert
  const independentRequirements = splitTopLevelAll(courseReqs)

  const graduationCourseErrors: Omit<Alert, 'id'>[] = []
  for (const requirement of independentRequirements) {
    const isRequirementSatisfied = resolveBooleanStatement(
      mapBooleanStatement(
        requirement,
        (courseId) =>
          // course is selected somewhere in plan
          data.courseSelections.find((s) => s.courseId === courseId) !== undefined,
      ),
    )

    const requirementText = booleanStatementToString(
      mapBooleanStatement(requirement, (courseId) => fullName(getCourse(data, courseId))),
    )

    if (!isRequirementSatisfied) {
      graduationCourseErrors.push({
        message: `${gradOption.name}: missing ${requirementText}`,
        ignored: false,
      })
    }
  }

  return graduationCourseErrors
}

function getGraduationCreditErrors(
  data: GlobalData,
  gradOption: GraduationOption,
): Omit<Alert, 'id'>[] {
  const creditReqs = gradOption.creditRequirements
  if (creditReqs === undefined) return []

  // Split up top-level 'all' because each statement can be rendered as a separate Alert
  const independentRequirements = splitTopLevelAll(creditReqs)

  const coursesByTags = data.courseSelections.map((s) => getCourse(data, s.courseId).tags)

  const graduationCourseErrors: Omit<Alert, 'id'>[] = []
  for (const requirement of independentRequirements) {
    const isRequirementSatisfied = resolveBooleanStatement(
      mapBooleanStatement(requirement, ({ credits, tagged }) => {
        // count credits
        // maybe dont double count taking the same course twice?
        let count = 0
        for (const courseTagList of coursesByTags) {
          if (
            resolveBooleanStatement(
              mapBooleanStatement(tagged, (requiredTag) => courseTagList.includes(requiredTag)),
            )
          ) {
            count++
          }
        }
        return count >= credits
      }),
    )

    const requirementText = booleanStatementToString(
      mapBooleanStatement(
        requirement,
        ({ credits, tagged }) =>
          `${credits} credit${credits === 1 ? '' : 's'} of ${booleanStatementToString(tagged)}`,
      ),
    )

    if (!isRequirementSatisfied) {
      graduationCourseErrors.push({
        message: `${gradOption.name}: requires ${requirementText}`,
        ignored: false,
      })
    }
  }

  return graduationCourseErrors
}

function splitTopLevelAll<T>(bs: BooleanStatement<T>): BooleanStatement<T>[] {
  if (bs instanceof Object && hasOwnProperty(bs, 'all')) {
    return bs.all as BooleanStatement<T>[]
  } else {
    return [bs]
  }
}

function getGradOption(data: GlobalData, id: number): GraduationOption {
  return data.graduationOptions.find((o) => o.id === id) as GraduationOption
}

function getCourse(data: GlobalData, courseId: CourseID): Course {
  return data.courses.find((c) => c.id === courseId) as Course
}

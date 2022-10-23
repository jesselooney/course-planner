import Alert from '../types/Alert'
import Course from '../types/Course'
import GlobalData from '../types/GlobalData'
import Grade from '../types/Grade'
import StateTuple from '../types/StateTuple'
import { mapBooleanStatement, resolveBooleanStatement } from './booleanStatement'

export function computeCourseRequirementErrors([data, setData]: StateTuple<GlobalData>): void {
  const prerequisiteErrors: Alert[] = []
  for (const [index, selection] of data.courseSelections.entries()) {
    const course = getCourse(data, selection.courseId)
    if (!arePrerequisitesMet(data, course, selection.grade))
      prerequisiteErrors.push({ id: index, message: course.prerequisitesText ?? '', ignored: false })
    // deal with corequisites
  }

  const newData = { ...data, courseRequirementErrors: prerequisiteErrors }
  setData(newData)
}

export function computeGraduationRequirementErrors([data, setData]: StateTuple<GlobalData>): void {}

function arePrerequisitesMet(data: GlobalData, course: Course, grade: Grade): boolean {
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

function getCourse(data: GlobalData, courseId: string): Course {
  return data.courses.find((c) => c.id === courseId) as Course
}

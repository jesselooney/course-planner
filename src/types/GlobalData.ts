import Alert from './Alert'
import Course from './Course'
import CourseSelection from './CourseSelection'
import GraduationOption from './GraduationOption'

export type GlobalData = {
  courses: Course[]
  courseSelections: CourseSelection[]
  courseRequirementErrors: Alert[]
  graduationOptionSelections: number[]
  requiredGradOptions: number[]
  graduationRequirementErrors: Alert[]
  graduationOptions: GraduationOption[]
}

export default GlobalData

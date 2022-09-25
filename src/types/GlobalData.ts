import Alert from './Alert'
import Course from './Course'
import CourseSelection from './CourseSelection'

export type GlobalData = {
  courses: Course[]
  courseSelections: CourseSelection[]
  graduationRequirementErrors: Alert[]
}

export default GlobalData

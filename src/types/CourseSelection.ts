import CourseID from './CourseID'
import Grade from './Grade'

export type CourseSelection = {
  id: number
  courseId: CourseID
  // What grade the course will be taken in
  grade: Grade
}

export default CourseSelection

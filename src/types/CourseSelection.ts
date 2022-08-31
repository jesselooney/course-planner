import Grade from './Grade'

export type CourseSelection = {
  id: number
  courseId: number
  // What grade the course will be taken in
  grade: Grade
}

export default CourseSelection

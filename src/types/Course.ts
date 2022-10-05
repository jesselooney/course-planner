import Grade from './Grade'
import CourseID from './CourseID'
import CourseLevel from './CourseLevel'
import Requirements from './Requirements'

export type Course = {
  id: CourseID
  name: string
  level: CourseLevel
  credits: 0.5 | 1
  expectedGrade: Grade
  prerequisites: Requirements
}

export default Course

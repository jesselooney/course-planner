import Grade from './Grade'
import CourseID from './CourseID'
import CourseLevel from './CourseLevel'
import BooleanStatement from './BooleanStatement'

// TODO: add 'tags' for course area etc
export type Course = {
  id: CourseID
  name: string
  level: CourseLevel
  credits: 0.5 | 1
  expectedGrade: Grade
  tags: string[]
  prerequisites?: BooleanStatement<CourseID>
  prerequisitesText?: string
}

export default Course

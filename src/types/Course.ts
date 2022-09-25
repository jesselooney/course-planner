import Grade from "./Grade"
import CourseID from "./CourseID"
import CourseLevel from "./CourseLevel"

export type Course = {
  id: CourseID
  name: string
  level: CourseLevel
  credits: 0.5 | 1
  expectedGrade: Grade
  prerequisites: Prerequisite[]
}

export type Prerequisite = {
  description: string
  courseId?: CourseID
}

export default Course

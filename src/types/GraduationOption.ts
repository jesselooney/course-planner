import BooleanStatement from './BooleanStatement'
import CourseID from './CourseID'

export type GraduationOption = {
  id: number
  name: string
  courseRequirements?: BooleanStatement<CourseID>
  creditRequirements?: BooleanStatement<{ credits: number; tagged: BooleanStatement<string> }>
}

export default GraduationOption

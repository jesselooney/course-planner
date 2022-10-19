import BooleanStatement from './BooleanStatement'
import CourseArea from './CourseArea'
import CourseID from './CourseID'

export type GraduationOption = {
  id: number
  name: string
  courseRequirements: BooleanStatement<CourseID>
  // TODO: use course tags instead of just course area
  creditRequirements: BooleanStatement<{ credits: number; area: CourseArea }>
}

export default GraduationOption

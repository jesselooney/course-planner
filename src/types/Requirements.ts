import CourseArea from './CourseArea'
import CourseID from './CourseID'

export type Requirements = {
  courses?: BooleanStatement<Requirement<CourseID>>
  credits?: BooleanStatement<Requirement<{ credits: number; area: CourseArea }>>
}

export type Requirement<T> = {
  value: T
  description: string
}

export type BooleanStatement<T> = {
  or?: BooleanStatement<T>[]
  and?: BooleanStatement<T>[]
  value?: T
}

export default Requirements

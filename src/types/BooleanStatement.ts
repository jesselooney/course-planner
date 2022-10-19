export type BooleanStatement<T> = {
  or?: BooleanStatement<T>[]
  and?: BooleanStatement<T>[]
} | T

export default BooleanStatement

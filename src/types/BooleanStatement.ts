import { all, any, none } from '../utils/booleanStatement'

export type BooleanStatement<T> = BooleanOperation<T> | T

export type BooleanOperation<T> =
  | {
      any: BooleanStatement<T>[]
    }
  | {
      all: BooleanStatement<T>[]
    }
  | {
      none: BooleanStatement<T>[]
    }

// IMPORTANT: ensure this mapping is always in line with type declaration
export const booleanOperations = { any: any, all: all, none: none }

export default BooleanStatement

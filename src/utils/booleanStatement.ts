import BooleanStatement, { BooleanOperation, booleanOperations } from '../types/BooleanStatement'
import { hasOwnProperty } from './hasOwnProperty'

export function mapBooleanStatement<A, B>(
  bs: BooleanStatement<A>,
  f: (a: A) => B,
): BooleanStatement<B> {
  if (!(bs instanceof Object)) {
    return f(bs)
  }
  for (const key of Object.keys(booleanOperations)) {
    if (hasOwnProperty(bs, key)) {
      const operands = (bs as Record<string, BooleanStatement<A>[]>)[key]
      return {
        [key]: operands.map((b) => mapBooleanStatement(b, f)),
      } as BooleanOperation<B>
    }
  }
  // appease TypeScript; the above for loop will always return,
  // so this line is never reached
  return null as unknown as BooleanStatement<B>
}

export function resolveBooleanStatement(bs: BooleanStatement<boolean>): boolean {
  if (bs instanceof Object) {
    for (const [key, booleanReducer] of Object.entries(booleanOperations)) {
      if (hasOwnProperty(bs, key)) {
        const operands = (bs as Record<string, BooleanStatement<boolean>[]>)[key]
        return booleanReducer(operands.map((b) => resolveBooleanStatement(b)))
      }
    }
    // appease TypeScript; the above for loop will always return,
    // so this line is never reached
    return true
  }
  return bs
}

export function any(array: boolean[]): boolean {
  return array.reduce((a, b) => a || b)
}

export function all(array: boolean[]): boolean {
  return array.reduce((a, b) => a && b)
}

export function none(array: boolean[]): boolean {
  return !any(array)
}

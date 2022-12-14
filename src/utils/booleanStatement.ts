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
  // the only case in which the above loop does not return
  // is if bs is of type A and that type happens to be an
  // instance of Object, so the following operation is
  // the desired behavior
  return f(bs as unknown as A)
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

export function booleanStatementToString(bs: BooleanStatement<string>): string {
  if (typeof bs === 'string') {
    return bs
  }

  if (hasOwnProperty(bs, 'any')) {
    return (bs.any as BooleanStatement<string>[])
      .map((b) => booleanStatementToString(b))
      .join(' or ')
  }
  if (hasOwnProperty(bs, 'all')) {
    return (bs.all as BooleanStatement<string>[])
      .map((b) => booleanStatementToString(b))
      .join(' and ')
  }
  if (hasOwnProperty(bs, 'none')) {
    return (
      'neither ' +
      (bs.none as BooleanStatement<string>[]).map((b) => booleanStatementToString(b)).join(' nor ')
    )
  }

  // One of the above if statements must match
  console.error('BooleanStatement pattern match unexpectedly failed.')
  return null as unknown as string
}

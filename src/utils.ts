import CourseSelection from './types/CourseSelection'
import GlobalData from './types/GlobalData'
import StateTuple from './types/StateTuple'

interface HasNumericId {
  id: number
}

function nextId(objects: HasNumericId[]): number {
  const ids = objects.map((o) => o.id)
  if (ids.length === 0) return 0
  return Math.max(...ids) + 1
}

export function createCourseSelection(
  [data, setData]: StateTuple<GlobalData>,
  selection: Omit<CourseSelection, 'id'>,
): void {
  data.courseSelections.push({ id: nextId(data.courseSelections), ...selection })
}

export function updateCourseSelection(
  [data, setData]: StateTuple<GlobalData>,
  selectionId: number,
  update: Partial<Omit<CourseSelection, 'id'>>,
): void {
  const index = data.courseSelections.findIndex((s) => s.id === selectionId)
  if (index >= 0) {
    const selection = data.courseSelections[index]
    const newSelection = { ...selection, ...update }
    data.courseSelections[index] = newSelection
    setData(data)
  }
}

export function removeCourseSelection([data, setData]: StateTuple<GlobalData>, selectionId: number): void {
  const index = data.courseSelections.findIndex((s) => s.id === selectionId)
  if (index >= 0) {
    data.courseSelections.splice(index, 1)
    setData(data)
  }
}

// https://fettblog.eu/typescript-hasownproperty/
export function hasOwnProperty<X extends {}, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}

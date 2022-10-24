import CourseSelection from '../types/CourseSelection'
import GlobalData from '../types/GlobalData'
import StateTuple from '../types/StateTuple'
import { nextId } from './nextId'

// TODO: fix these methods so they update data properly

export function createCourseSelection(
  [data, setData]: StateTuple<GlobalData>,
  selection: Omit<CourseSelection, 'id'>,
): void {
  const newSelection = { id: nextId(data.courseSelections), ...selection }
  setData({ ...data, courseSelections: [...data.courseSelections, newSelection] })
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

export function removeCourseSelection(
  [data, setData]: StateTuple<GlobalData>,
  selectionId: number,
): void {
  const index = data.courseSelections.findIndex((s) => s.id === selectionId)
  if (index >= 0) {
    data.courseSelections.splice(index, 1)
    setData(data)
  }
}

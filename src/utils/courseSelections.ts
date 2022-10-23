import CourseSelection from '../types/CourseSelection'
import GlobalData from '../types/GlobalData'
import StateTuple from '../types/StateTuple'
import { nextId } from './nextId'

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

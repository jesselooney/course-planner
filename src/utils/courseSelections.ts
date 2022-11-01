import CourseSelection from '../types/CourseSelection'
import GlobalData from '../types/GlobalData'
import { nextId } from './nextId'

// TODO: fix these methods so they update data properly

export function createCourseSelection(
  data: GlobalData,
  selection: Omit<CourseSelection, 'id'>,
): GlobalData {
  const newSelection = { id: nextId(data.courseSelections), ...selection }
  return { ...data, courseSelections: [...data.courseSelections, newSelection] }
}

export function updateCourseSelection(
  data: GlobalData,
  selectionId: number,
  update: Partial<Omit<CourseSelection, 'id'>>,
): GlobalData {
  const index = data.courseSelections.findIndex((s) => s.id === selectionId)
  if (index >= 0) {
    const selection = data.courseSelections[index]
    const newSelection = { ...selection, ...update }
    const courseSelections = [...data.courseSelections]
    courseSelections[index] = newSelection
    return { ...data, courseSelections: courseSelections }
  }
  return data
}

export function removeCourseSelection(data: GlobalData, selectionId: number): GlobalData {
  const index = data.courseSelections.findIndex((s) => s.id === selectionId)
  if (index >= 0) {
    const courseSelections = [...data.courseSelections]
    courseSelections.splice(index, 1)
    return { ...data, courseSelections: courseSelections }
  }
  return data
}

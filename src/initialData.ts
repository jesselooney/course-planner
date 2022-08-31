import GlobalData from './types/GlobalData'

export const initialData: GlobalData = {
  courses: [
    { id: 0, name: 'European History', credits: 1 },
    { id: 1, name: 'Biology', credits: 1 },
    { id: 2, name: 'Psychology', credits: .5 },
  ],
  courseSelections: [],
}

export default initialData

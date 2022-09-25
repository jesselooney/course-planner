import GlobalData from './types/GlobalData'

export const initialData: GlobalData = {
  courses: [
    {
      id: '0',
      name: 'European History',
      level: 'Advanced Placement',
      credits: 1,
      expectedGrade: 10,
      prerequisites: [{ description: 'passing grade in World History II Honors', courseId: '1' }],
    },
    { id: '1', name: 'World History II', level: 'Honors', credits: 1, expectedGrade: 9, prerequisites: [] },
    { id: '2', name: 'Psychology', level: 'Honors', credits: 0.5, expectedGrade: 11, prerequisites: [] },
  ],
  courseSelections: [],
  graduationRequirementErrors: [{id: 0, message: 'XYZ: three credits of astrophysics', ignored: false}, {id: 1, message: 'ABC: twenty credits of high-energy dentistry', ignored: false}],
}

export default initialData

import GlobalData from './types/GlobalData'

export const initialData: GlobalData = {
  courses: [
    {
      id: '0',
      name: 'European History',
      level: 'Advanced Placement',
      credits: 1,
      expectedGrade: 10,
      prerequisites: {
        courses: {
          or: [
            {
              value: {
                value: 'H1109',
                description: 'Grade of B- or better in World History II Honors',
              },
            },
            {
              value: {
                value: 'H1111',
                description: 'B+ or better in World History II and recommendation of teacher',
              },
            },
          ],
        },
      },
    },
    {
      id: '1',
      name: 'World History II',
      level: 'Honors',
      credits: 1,
      expectedGrade: 9,
      prerequisites: {},
    },
    {
      id: '2',
      name: 'Psychology',
      level: 'Honors',
      credits: 0.5,
      expectedGrade: 11,
      prerequisites: {},
    },
  ],
  courseSelections: [],
  courseRequirementErrors: [
    { id: 0, message: 'XYZ: three credits of astrophysics', ignored: false },
    { id: 1, message: 'ABC: twenty credits of high-energy dentistry', ignored: false },
  ],
  graduationOptions: [
    { id: 0, name: 'Haverhill High', requirements: {} },
    { id: 1, name: 'Classical Academy', requirements: {} },
  ],
  requiredGradOptions: [0],
  graduationOptionSelections: [],
  graduationRequirementErrors: [
    { id: 0, message: 'XYZ: three credits of astrophysics', ignored: false },
    { id: 1, message: 'ABC: twenty credits of high-energy dentistry', ignored: false },
  ],
}

export default initialData

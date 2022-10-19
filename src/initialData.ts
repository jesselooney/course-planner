import GlobalData from './types/GlobalData'

export const initialData: GlobalData = {
  courses: [
    {
      id: 'H1110',
      name: 'European History',
      level: 'Advanced Placement',
      credits: 1,
      expectedGrade: 10, // 10-12?
      courseRequirements: {
        or: ['H1109', 'H1111'],
      },
    },
    {
      id: 'H1109',
      name: 'World History II',
      level: 'Honors',
      credits: 1,
      expectedGrade: 9,
      courseRequirements: {},
    },
    {
      id: 'H1111',
      name: 'World History II',
      level: 'College Preparatory',
      credits: 1,
      expectedGrade: 9,
      courseRequirements: {},
    },
    {
      id: 'H1115',
      name: 'U.S. History',
      level: 'Advanced Placement',
      credits: 1,
      expectedGrade: 11,
      courseRequirements: {
        or: ['H1111', 'H1110'], // or World History AP ? (course not found)
      },
    },
    {
      id: 'H1130',
      name: 'Psychology',
      level: 'Honors',
      credits: 0.5,
      expectedGrade: 11,
      courseRequirements: {},
    },
  ],
  courseSelections: [],
  courseRequirementErrors: [
    { id: 0, message: 'XYZ: three credits of astrophysics', ignored: false },
    { id: 1, message: 'ABC: twenty credits of high-energy dentistry', ignored: false },
  ],
  graduationOptions: [
    {
      id: 0,
      name: 'Haverhill High',
      courseRequirements: {},
      creditRequirements: {
        and: [
          { credits: 4, area: 'English' },
          { credits: 3, area: 'History' },
          { credits: 3, area: 'Mathematics' },
          { credits: 3, area: 'Science and Engineering' },
          { credits: 0.5, area: 'STEM Technology' },
          { credits: 3, area: 'School to Career' },
          {
            or: [
              { credits: 1, area: 'Fine Arts' },
              { credits: 1, area: 'World Languages' },
            ],
          },
          { credits: 2, area: 'Wellness' },
          { credits: 0.5, area: 'Public Speaking' },
          { credits: 2, area: 'Electives' },
        ],
      },
    },
    { id: 1, name: 'Classical Academy', courseRequirements: {}, creditRequirements: {} },
  ],
  requiredGradOptions: [0],
  graduationOptionSelections: [],
  graduationRequirementErrors: [
    { id: 0, message: 'XYZ: three credits of astrophysics', ignored: false },
    { id: 1, message: 'ABC: twenty credits of high-energy dentistry', ignored: false },
  ],
}

export default initialData

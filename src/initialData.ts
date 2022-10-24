import GlobalData from './types/GlobalData'

export const initialData: GlobalData = {
  courses: [
    {
      id: 'H1110',
      name: 'European History',
      level: 'Advanced Placement',
      credits: 1,
      expectedGrade: 10, // 10-12?
      prerequisites: {
        any: ['H1109', 'H1111'],
      },
      tags: ['History'],
    },
    {
      id: 'H1109',
      name: 'World History II',
      level: 'Honors',
      credits: 1,
      expectedGrade: 9,
      tags: ['History'],
    },
    {
      id: 'H1111',
      name: 'World History II',
      level: 'College Preparatory',
      credits: 1,
      expectedGrade: 9,
      tags: ['History'],
    },
    {
      id: 'H1115',
      name: 'U.S. History',
      level: 'Advanced Placement',
      credits: 1,
      expectedGrade: 11,
      prerequisites: {
        any: ['H1111', 'H1110'], // or World History AP ? (course not found)
      },
      tags: ['History'],
    },
    {
      id: 'H1130',
      name: 'Psychology',
      level: 'Honors',
      credits: 0.5,
      expectedGrade: 11,
      tags: ['History', 'Elective'],
    },
  ],
  courseSelections: [],
  courseRequirementErrors: [],
  graduationOptions: [
    {
      id: 0,
      name: 'Haverhill High',
      creditRequirements: {
        all: [
          { credits: 4, tagged: 'English' },
          { credits: 3, tagged: 'History' },
          { credits: 3, tagged: 'Mathematics' },
          { credits: 3, tagged: 'Science and Engineering' },
          { credits: 0.5, tagged: 'STEM Technology' },
          { credits: 1, tagged: 'School-to-Career' },
          { credits: 1, tagged: { any: ['Fine Arts', 'World Language'] } },
          { credits: 2, tagged: 'Wellness' },
          { credits: 0.5, tagged: 'Public Speaking' },
          { credits: 2, tagged: 'Elective' },
        ],
      },
    },
    { id: 1, name: 'Classical Academy' },
  ],
  requiredGradOptions: [0],
  graduationOptionSelections: [],
  graduationRequirementErrors: [
    { id: 0, message: 'XYZ: three credits of astrophysics', ignored: false },
    { id: 1, message: 'ABC: twenty credits of high-energy dentistry', ignored: false },
  ],
}

export default initialData

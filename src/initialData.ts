import GlobalData from './types/GlobalData'

export const initialData: GlobalData = {
  courses: [
    {
      id: 'H1110',
      name: 'European History',
      level: 'Advanced Placement',
      credits: 1,
      expectedGrade: 10, // 10-12?
      description:
        'An Advanced placement course detailing the history of the European continent. Starting in 1450 and continuing to present day, this course covers the major events and themes of European history as they relate to modern considerations.',
      prerequisites: {
        any: ['H1109', 'H1111'],
      },
      prerequisitesText:
        'Grade of B- or better in World History II Honors or B+ in World History II and recommendation of teacher.',
      tags: ['History'],
    },
    {
      id: 'H1109',
      name: 'World History II',
      level: 'Honors',
      credits: 1,
      expectedGrade: 9,
      description: '',
      tags: ['History'],
    },
    {
      id: 'H1111',
      name: 'World History II',
      level: 'College Preparatory',
      credits: 1,
      expectedGrade: 9,
      description: '',
      tags: ['History'],
    },
    {
      id: 'H1115',
      name: 'U.S. History',
      level: 'Advanced Placement',
      credits: 1,
      expectedGrade: 11,
      description: '',
      prerequisites: {
        any: ['H1111', 'H1110'], // or World History AP ? (course not found)
      },
      prerequisitesText:
        'Grade of B- or better in World History II or a passing grade in AP European History or AP World History, and recommendation of teacher.',
      tags: ['History', 'U.S. History'],
    },
    {
      id: 'H1130',
      name: 'Psychology',
      level: 'Honors',
      credits: 0.5,
      expectedGrade: 11,
      description: '',
      tags: ['History', 'Elective'],
    },
    {
      id: 'H1126',
      name: 'U.S. History I',
      level: 'Honors',
      credits: 1,
      expectedGrade: 10,
      description: '',
      tags: ['History', 'U.S. History'],
      prerequisites: {
        any: ['H1111', 'H1109'],
      },
      prerequisitesText:
        'Grade of B- or better in World History II or passing grade in World History II Honors and receive the recommendation of his/her teacher.',
    },
    {
      id: 'H1117',
      name: 'U.S. History II',
      level: 'Honors',
      credits: 1,
      expectedGrade: 11,
      description: '',
      tags: ['History', 'U.S. History'],
      prerequisites: {
        any: ['H1126', 'H1109'],
      },
      prerequisitesText:
        'Grade of B- or better in U.S. History I or passing grade in World History II Honors and receive the recommendation of his/her teacher.',
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
      courseRequirements: {
        all: [{ any: ['H1109', 'H1111'] }, { any: [{ all: ['H1126', 'H1117'] }, 'H1115'] }],
      },
    },
    { id: 1, name: 'Classical Academy' },
  ],
  requiredGradOptions: [0],
  graduationOptionSelections: [],
  graduationRequirementErrors: [],
}

export default initialData

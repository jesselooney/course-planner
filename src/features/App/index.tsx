import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import GlobalData from '../../types/GlobalData'
import CourseBucket from '../CourseBucket'
import TabMenu from '../TabMenu'
import initialData from '../../initialData'

import './style.css'
import {
  computeCourseRequirementErrors,
  computeGraduationRequirementErrors,
} from '../../utils/requirements'

const defaultContext: [GlobalData, (_: GlobalData) => void] = [initialData, (_: GlobalData) => {}]

export const DataContext = React.createContext(defaultContext)

function App() {
  // ensure data is initialized to a valid state
  initialData.graduationOptionSelections = initialData.requiredGradOptions
  const [data, setData] = useState(initialData)

  // run only when data.courseSelections changes
  computeCourseRequirementErrors([data, setData])
  // computeGraduationRequirementErrors([data, setData])

  return (
    <div className="App">
      <DataContext.Provider value={[data, setData]}>
        <DndProvider backend={HTML5Backend}>
          <TabMenu />
          <div className="App__CourseBuckets">
            <CourseBucket title="9th Grade" grade={9} />
            <CourseBucket title="10th Grade" grade={10} />
            <CourseBucket title="11th Grade" grade={11} />
            <CourseBucket title="12th Grade" grade={12} />
          </div>
        </DndProvider>
      </DataContext.Provider>
    </div>
  )
}

export default App

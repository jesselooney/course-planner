import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import GlobalData from '../../types/GlobalData'
import CourseBucket from '../CourseBucket'
import CourseSearch from '../CourseSearch'
import initialData from '../../initialData'

import './style.css'

const defaultContext: [GlobalData, (_: GlobalData) => void] = [initialData, (_: GlobalData) => {}]

export const DataContext = React.createContext(defaultContext)

function App() {
  const [data, setData] = useState(initialData)

  return (
    <div className="App">
      <DataContext.Provider value={[data, setData]}>
        <DndProvider backend={HTML5Backend}>
          <CourseSearch />
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

import objstr from 'obj-str'
import React, { useContext, useState } from 'react'
import { useDrop } from 'react-dnd'

import Grade from '../../types/Grade'
import { hasOwnProperty, removeCourseSelection } from '../../utils'
import { DataContext } from '../App'
import CourseItem from '../CourseItem'

import './style.css'

function CourseSearch() {
  const [data, setData] = useContext(DataContext)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'COURSE',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(item, _) {
      if (item instanceof Object && hasOwnProperty(item, 'id') && typeof item.id === 'number')
        removeCourseSelection([data, setData], item.id)
    },
  }))

  const [searchString, setSearchString] = useState('')

  const courseItems = data.courses
    .filter((c) => c.name.toLowerCase().includes(searchString.toLowerCase()))
    .map((course, index) => <CourseItem course={course} />)

  return (
    <div ref={drop} className="CourseSearch">
      <input value={searchString} onChange={(e) => setSearchString(e.target.value)} type="text" />
      <ul>{courseItems}</ul>
    </div>
  )
}

export default CourseSearch

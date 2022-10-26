import React, { useContext, useState } from 'react'
import { useDrop } from 'react-dnd'
import Fuse from 'fuse.js'

import { hasOwnProperty } from '../../utils/hasOwnProperty'
import { removeCourseSelection } from '../../utils/courseSelections'
import { DataContext } from '../App'
import CourseItem from '../CourseItem'

import './style.css'

function CourseSearch() {
  const [data, setData] = useContext(DataContext)

  const [, drop] = useDrop(
    () => ({
      accept: 'COURSE',
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop(item, _) {
        if (item instanceof Object && hasOwnProperty(item, 'id') && typeof item.id === 'number')
          removeCourseSelection([data, setData], item.id)
      },
    }),
    [data, setData],
  )

  const [searchString, setSearchString] = useState('')

  const fuse = new Fuse(data.courses, { keys: ['name'] })

  let searchResults = fuse.search(searchString)

  if (searchResults.length === 0) {
    searchResults = data.courses.map((v) => {
      return {
        item: v,
        refIndex: 0,
      }
    })
  }

  const courseItems = searchResults.map((result, index) => <CourseItem course={result.item} />)

  return (
    <div ref={drop} className="CourseSearch">
      <input
        className="CourseSearch--input"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        type="text"
      />
      <ul className="CourseSearch__Courses">{courseItems}</ul>
    </div>
  )
}

export default CourseSearch

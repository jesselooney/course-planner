import objstr from 'obj-str'
import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'
import Course from '../../types/Course'

import Grade from '../../types/Grade'
import { hasOwnProperty, createCourseSelection, updateCourseSelection } from '../../utils'
import { DataContext } from '../App'
import CourseItem from '../CourseItem'

import './style.css'

function CourseBucket({ title, grade }: { title: string; grade: Grade }) {
  const [data, setData] = useContext(DataContext)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'COURSE',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(item, _) {
      if (
        item instanceof Object &&
        hasOwnProperty(item, 'id') &&
        hasOwnProperty(item, 'courseId')
      ) {
        if (typeof item.id === 'number') updateCourseSelection([data, setData], item.id, { grade })
        if (typeof item.id === 'undefined' && typeof item.courseId === 'string')
          createCourseSelection([data, setData], { courseId: item.courseId, grade })
      }
    },
  }))

  const courseItems = data.courseSelections
    // select courses from this grade
    .filter((s) => s.grade === grade)
    // find the associated courses, keeping the selection ID
    .map((s) => ({
      id: s.id,
      course: data.courses.find((c) => c.id === s.courseId),
    }))
    // exclude selections whose associated courses cannot be found
    .filter((s): s is Omit<typeof s, 'course'> & { course: Course } => s.course !== undefined)
    // sort with comparison by course
    .sort((a, b) => compareCourses(a.course, b.course))
    // convert to CourseItem elements
    .map(({ id, course }) => <CourseItem key={id} id={id} course={course} />)

  return (
    <div
      ref={drop}
      className={objstr({
        CourseBucket: true,
        'CourseBucket--isOver': isOver,
        'CourseBucket--canDrop': canDrop,
      })}
    >
      {title}
      <ul className="CourseBucket__Courses">{courseItems}</ul>
    </div>
  )
}

function compareCourses(course1: Course, course2: Course): number {
  // order alphabetically
  return course1.name.localeCompare(course2.name)
}

export default CourseBucket

import objstr from 'obj-str'
import React from 'react'
import { useDrag, XYCoord } from 'react-dnd'

import Course from '../../types/Course'

import './style.css'

function CourseItem({ id, course }: { id?: number; course: Course }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'COURSE',
    item: { id, courseId: course.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={objstr({
        CourseItem: true,
        'CourseItem--halfYear': course.credits === 0.5,
        'CourseItem--isDragging': isDragging,
      })}
    >
      <span className='CourseItem__inner'>{course.name}</span>
    </div>
  )
}

export default CourseItem

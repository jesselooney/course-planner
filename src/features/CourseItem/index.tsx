import objstr from 'obj-str'
import { useDrag } from 'react-dnd'

import Course from '../../types/Course'
import { toKebabCase } from '../../utils/toKebabCase'

import './style.css'

function CourseItem({ id, course }: { id?: number; course: Course }) {
  const [{ isDragging }, drag] = useDrag(() => ({
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
      <span
        className="CourseItem__inner"
        data-level={toKebabCase(course.level)}
        data-name={course.name}
      >
        {course.name}
      </span>
    </div>
  )
}

export default CourseItem

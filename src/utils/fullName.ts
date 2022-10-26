import Course from '../types/Course'

export function fullName(course: Course): string {
  return course.name + ' ' + course.level
}

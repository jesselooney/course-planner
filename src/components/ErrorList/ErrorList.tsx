import objstr from 'obj-str'
import React from 'react'
// accept a calback function for when the number of active errors changes
// wrap each child element in an <li> with onClick handler changing its visibility
// manage state of children somehow?
export function ErrorList({ children }: { children: React.ReactNode }) {
  return <ul className="ErrorList">{children}</ul>
}

export default ErrorList

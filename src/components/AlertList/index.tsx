import objstr from 'obj-str'
import Alert from '../../types/Alert'
import './style.css'

export function AlertList({
  alerts,
  toggleIgnored,
}: {
  alerts: Alert[]
  toggleIgnored: (id: number) => void
}) {
  return <ul className="AlertList">{alerts.map((a) => AlertItem(a, toggleIgnored))}</ul>
}

export function AlertItem({ id, message, ignored }: Alert, toggleIgnored: (id: number) => void) {
  return (
    <li
      className={objstr({ AlertList__AlertItem: true, 'AlertList__AlertItem--ignored': ignored })}
      key={id}
      onClick={(e) => {
        console.warn(e)
        toggleIgnored(id)
      }}
    >
      {message}
    </li>
  )
}

export default AlertList

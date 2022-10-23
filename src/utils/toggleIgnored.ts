import Alert from '../types/Alert'

export function toggleIgnored(alerts: Alert[], id: number): Alert[] {
  const index = alerts.findIndex((a) => a.id === id)
  if (index >= 0) {
    const alert = alerts[index]
    const newAlert = { ...alert, ignored: !alert.ignored }
    alerts[index] = newAlert
  }

  return alerts
}

interface HasNumericId {
  id: number
}
export function nextId(objects: HasNumericId[]): number {
  const ids = objects.map((o) => o.id)
  if (ids.length === 0) return 0
  return Math.max(...ids) + 1
}

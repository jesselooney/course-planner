import objstr from 'obj-str'

type MissingRequirement = {
  description: string
  fulfilled: boolean
  ignored: boolean
}

export function ErrorList() {

  return <ul className="MissingRequirements">elements</ul>
}

function Requirement({ description, ignored }: DisplayedRequirement) {
  return (
    <div
      className={objstr({
        MissingRequirements__Requirement: true,
        'MissingRequirements__Requirement--ignored': ignored,
      })}
    >
      {description}
    </div>
  )
}

export default MissingRequirements

import { useContext, useState } from 'react'
import ListTable from './Lista'
import { ProjectContext } from '../context/ProjectContext'
import Campos from './Campos'
import ViewMin from './ViewMin'

export default ({ beginTable }) => {
  const { table, sheet } = useContext(ProjectContext)
  const [isSelectedTable, setIsSelectedTable] = useState(false)

  const [step, setStep] = useState(0)

  const nextStep = () => {
    console.log(table)
    if (!table.id) return
    setStep((s) => s + 1)
  }

  const prevStep = () => {
    console.log(table)
    if (!table.id) return
    setStep((s) => s - 1)
  }

  return (
    <>
      {step == 0 && <ListTable primaryKey={nextStep} secondaryKey={beginTable} />}
      {step == 1 && <Campos primaryKey={nextStep} secondaryKey={prevStep} />}
      {step == 2 && <ViewMin  secondaryKey={prevStep} />}
    </>
  )
}

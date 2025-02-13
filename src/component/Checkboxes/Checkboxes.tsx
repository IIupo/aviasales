import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFilter } from '../../store/TicketSlice'
import styles from './Checkboxes.module.css'
import { TicketsState, Checkbox, CheckboxId } from '../../types/types'

export const Checkboxes: React.FC = () => {
  const checkboxes = useSelector((state: { tickets: TicketsState }) => state.tickets.checkboxes)
  const dispatch = useDispatch()

  const handleToggle = (id: CheckboxId) => {
    dispatch(toggleFilter(id))
  }

  return (
    <div className={styles.board}>
      <span className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      {checkboxes.map((checkbox: Checkbox) => (
        <div key={checkbox.id}>
          <input type='checkbox' checked={checkbox.checked} onChange={() => handleToggle(checkbox.id)} />
          <label>{checkbox.label}</label>
        </div>
      ))}
    </div>
  )
}

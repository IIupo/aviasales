import React from 'react'
import styles from './Ticket.module.css'
import { TicketProps } from '../../types/types'
import { formatDate, getStopsWord } from '../../utilites/utilites'

export const Card: React.FC<TicketProps> = ({ ticket }) => {
  const { price, carrier, segments } = ticket

  return (
    <li className={styles.ticket}>
      <div className={styles.ticket_header}>
        <span className={styles.price}>{price} P</span>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
      </div>
      {segments.map((segment, index) => {
        const { departureTime, arrivalTime } = formatDate(segment.date, segment.duration)
        const stopsWord = getStopsWord(segment.stops.length)

        return (
          <div key={index} className={styles.segment}>
            <div className={styles.flex_container}>
              <span className={styles.text}>
                {segment.origin} - {segment.destination}
              </span>
              <span className={styles.meta}>
                {departureTime} - {arrivalTime}
              </span>
            </div>
            <div className={styles.flex_container}>
              <span className={styles.text}>{'В ПУТИ'}</span>
              <span className={styles.meta}>
                {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
              </span>
            </div>
            <div className={styles.flex_container}>
              <span className={styles.text}>
                {segment.stops.length} {stopsWord}
              </span>
              <span className={styles.meta}>{segment.stops.join(', ')}</span>
            </div>
          </div>
        )
      })}
    </li>
  )
}

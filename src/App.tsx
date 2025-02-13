import React from 'react'
import { Checkboxes } from './component/Checkboxes/Checkboxes'
import { Page } from './component/Page'
import { Header } from './component/Logo'
import styles from './App.module.css'

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.flexCont}>
        <Checkboxes />
        <Page />
      </div>
    </>
  )
}

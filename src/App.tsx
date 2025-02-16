import React from 'react'
import { Checkboxes } from './component/Checkboxes/Checkboxes'
import { Page } from './component/Page'
import styles from './App.module.css'
import { PlaneLogo } from './component/Logo'

export const App: React.FC = () => {
  return (
    <>
    <PlaneLogo />
      <div className={styles.flexCont}>
        <Checkboxes />
        <Page />
      </div>
    </>
  )
}

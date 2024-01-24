import './style.css'
import AppNav from '../../components/common/AppNav'
import { useState } from 'react'
import ArtiQuest from '../../components/artiQuest/ArtiQuest'

const HomePage = () => {
  const [demoMode, setDemoMode] = useState(false)

  const closeDemoMode = () => {
    setDemoMode(false)
    localStorage.removeItem('artiQuest-demo')
  }

  return (
    <div className={!demoMode ? 'home' : 'home demo'}>
      <AppNav isdemo={demoMode} closeDemo={closeDemoMode} />

      <ArtiQuest isdemo={demoMode} />
    </div>
  )
}

export default HomePage
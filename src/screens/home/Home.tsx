import './style.css'
import AppNav from '../../components/common/AppNav'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const [demoMode, setDemoMode] = useState(false)

  const closeDemoMode = () => {
    setDemoMode(false)
    localStorage.removeItem('artiQuest-demo')
  }

  useEffect(() => {
    const isdemo = localStorage.getItem('artiQuest-demo')

    setDemoMode(Boolean(isdemo))
  }, [])

  return (
    <div className={!demoMode ? 'home' : 'home demo'}>
      <AppNav isdemo={demoMode} closeDemo={closeDemoMode} />

    </div>
  )
}

export default HomePage
import './style.css'
import AppNav from '../../components/common/AppNav'
import { useEffect, useState } from 'react'
import ArtiQuest from '../../components/artiQuest/ArtiQuest'

const HomePage = () => {
  const [demoMode, setDemoMode] = useState(false)
  const [componentsState, setComponentsState] = useState<JSX.Element[]>([])

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

      <ArtiQuest isdemo={demoMode} />
    </div>
  )
}

export default HomePage
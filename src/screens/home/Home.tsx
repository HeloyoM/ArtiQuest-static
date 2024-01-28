import './style.css'
import AppNav from '../../components/common/navbar/AppNav'
import { useEffect, useState } from 'react'
import ArtiQuest from '../../components/artiQuest/ArtiQuest'
import { useQuery } from '@tanstack/react-query'
import { findAllUsers } from '../../api/user'

const HomePage = () => {
  const [demoMode, setDemoMode] = useState(false)
  const [componentsState, setComponentsState] = useState<JSX.Element[]>([])

  const { isLoading, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: findAllUsers
  })

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
      <AppNav isdemo={demoMode} closeDemo={closeDemoMode} users={users} />

      <ArtiQuest isdemo={demoMode} />

    </div>
  )
}

export default HomePage
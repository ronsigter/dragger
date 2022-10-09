import { Main } from './Main'
import { MainLayout } from 'layout'
import type { NextPage } from 'next'

const MainContainer: NextPage = () => {
  return (
    <MainLayout>
      <Main />
    </MainLayout>
  )
}

export default MainContainer

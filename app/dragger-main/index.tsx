import { Main } from './Main'
import { MainLayout } from 'layout'
import type { NextPage } from 'next'
import { GridContextProvider } from './context/GridContext'

const MainContainer: NextPage = () => {
  return (
    <MainLayout>
      <GridContextProvider>
        <Main />
      </GridContextProvider>
    </MainLayout>
  )
}

export default MainContainer

import { Login } from './Login'
import { MainLayout } from 'layout'
import type { NextPage } from 'next'

const LoginContainer: NextPage = () => {
  return (
    <MainLayout>
      <Login />
    </MainLayout>
  )
}

export default LoginContainer

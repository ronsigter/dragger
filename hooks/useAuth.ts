import axios from 'axios'
import { setCookie, deleteCookie } from 'cookies-next'
import { GetToken } from 'lib/keycloak'

type FormType = {
  email: string
  password: string
}

export const useAuth = () => {
  const login = async (_form: FormType): Promise<void> => {
    // TODO: Pass form data as parameters
    const data = await GetToken()

    setCookie('token', `Bearer ${data.access_token}`)
    setCookie('refresh_token', data.refresh_token)
  }

  const logout = () => {
    deleteCookie('token')
  }

  return {
    login,
    logout,
  }
}

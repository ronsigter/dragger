import axios from 'axios'
import { setCookie, deleteCookie } from 'cookies-next'

type FormType = {
  email: string
  password: string
}

type PasswordType = {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
}

const KEYCLOAK_URL = process.env.KEYCLOAK_URL || ''
const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID || ''
const KEYCLOAK_USERNAME = process.env.KEYCLOAK_USERNAME || ''
const KEYCLOAK_PASSWORD = process.env.KEYCLOAK_PASSWORD || ''

export const useAuth = () => {
  const login = async (_form: FormType): Promise<void> => {
    // TODO: Pass form data as parameters
    const { data } = await axios.post<PasswordType>(
      KEYCLOAK_URL,
      {
        client_id: KEYCLOAK_CLIENT_ID,
        password: KEYCLOAK_PASSWORD,
        username: KEYCLOAK_USERNAME,
        grant_type: 'password',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    setCookie('token', `Bearer ${data.access_token}`)
  }

  const logout = () => {
    deleteCookie('token')
  }

  return {
    login,
    logout,
  }
}

type PasswordType = {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
}

type RefreshTokenType = PasswordType & {
  error?: string
  error_description?: string
}

const KEYCLOAK_URL = process.env.KEYCLOAK_URL || ''
const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID || ''
const KEYCLOAK_USERNAME = process.env.KEYCLOAK_USERNAME || ''
const KEYCLOAK_PASSWORD = process.env.KEYCLOAK_PASSWORD || ''

export const GetToken = (): Promise<PasswordType> => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('client_id', KEYCLOAK_CLIENT_ID)
  urlencoded.append('password', KEYCLOAK_PASSWORD)
  urlencoded.append('username', KEYCLOAK_USERNAME)
  urlencoded.append('grant_type', 'password')

  const requestOptions = {
    method: 'POST',
    headers,
    body: urlencoded,
    redirect: 'follow' as const,
  }

  return fetch(KEYCLOAK_URL, requestOptions).then((res) => res.json())
}

export const GetRefreshToken = (
  refresh_token: string
): Promise<RefreshTokenType> => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('client_id', KEYCLOAK_CLIENT_ID)
  urlencoded.append('refresh_token', refresh_token)
  urlencoded.append('grant_type', 'refresh_token')

  const requestOptions = {
    method: 'POST',
    headers,
    body: urlencoded,
    redirect: 'follow' as const,
  }

  return fetch(KEYCLOAK_URL, requestOptions).then((res) => res.json())
}

import { NextResponse } from 'next/server'
import { GetRefreshToken } from 'lib/keycloak'
import { Routes } from 'routes'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token')
  const response = NextResponse.next()

  // ? If no token found, redirect to Login Page
  if (!refreshToken)
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url))

  const data = await GetRefreshToken(refreshToken)

  // ? If no data returned or with error, redirect to Login Page
  if (!data || data.error) {
    // ? Deleting cookies
    response.cookies.delete('token')
    response.cookies.delete('refresh_token')

    return NextResponse.redirect(new URL(Routes.LOGIN, request.url))
  }

  response.cookies.set('token', `Bearer ${data.access_token}`)
  response.cookies.set('refresh_token', data.refresh_token)

  return response
}

export const config = {
  matcher: '/',
}

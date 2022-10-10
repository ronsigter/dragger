import {
  render,
  screen,
  userEvent,
  waitScreenUpdate,
  fetchMock,
} from 'lib/test.utils'
import LoginContainer from '..'

const mockRouterPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      query: {},
      push: mockRouterPush,
    }
  },
}))

describe('<LoginContainer />', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    render(<LoginContainer />)
  })

  it('Shows successful toaster if login successful', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      })
    )

    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'test@dragger.com'
    )
    await user.type(
      screen.getByRole('textbox', { name: /password/i }),
      'password'
    )
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitScreenUpdate()

    expect(screen.getByRole('listitem')).toHaveTextContent('Login successful.')
    expect(mockRouterPush).toBeCalledTimes(1)
    expect(mockRouterPush).toBeCalledWith('/')
  })

  it('Shows error toaster if login unsuccessful', async () => {
    fetchMock.mockReject(() => Promise.reject('API is down'))

    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'test@dragger.com'
    )
    await user.type(
      screen.getByRole('textbox', { name: /password/i }),
      'password'
    )

    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitScreenUpdate()

    expect(screen.getByRole('listitem')).toHaveTextContent(
      'Login unsuccessful.'
    )
    expect(mockRouterPush).toBeCalledTimes(0)
  })
})

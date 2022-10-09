import { render, screen, userEvent, waitScreenUpdate } from 'lib/test.utils'
import LoginContainer from '..'

describe('<LoginContainer />', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    render(<LoginContainer />)
  })

  it('Loads the login form', () => {
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /password/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('Validates the whole form when no input detected', async () => {
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitScreenUpdate()

    const fields = screen.getAllByRole('textbox')

    const errorMessageElement = screen.getAllByRole('presentation', {
      name: /form-error-message/i,
    })

    const errorMessages = [
      'Please enter your email',
      'Please enter your password',
    ]

    expect(errorMessageElement.length).toBe(2)
    for (let i = 0; i < errorMessages.length; i++) {
      expect(errorMessageElement[i]).toHaveTextContent(errorMessages[i])
      expect(fields[i]).toHaveStyle({
        'border-color': '#E53E3E',
      })
    }
  })

  it('Validates email field', async () => {
    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'invalid_email'
    )
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitScreenUpdate()

    const fields = screen.getAllByRole('textbox')

    const errorMessageElement = screen.getAllByRole('presentation', {
      name: /form-error-message/i,
    })

    const errorMessages = [
      'Please enter a valid email address',
      'Please enter your password',
    ]

    expect(errorMessageElement.length).toBe(2)
    for (let i = 0; i < errorMessages.length; i++) {
      expect(errorMessageElement[i]).toHaveTextContent(errorMessages[i])
      expect(fields[i]).toHaveStyle({
        'border-color': '#E53E3E',
      })
    }
  })

  it('Validates password field', async () => {
    await user.type(screen.getByRole('textbox', { name: /password/i }), 'passw')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitScreenUpdate()

    const fields = screen.getAllByRole('textbox')

    const errorMessageElement = screen.getAllByRole('presentation', {
      name: /form-error-message/i,
    })

    const errorMessages = [
      'Please enter your email',
      'Password must be at least 6 characters',
    ]

    expect(errorMessageElement.length).toBe(2)
    for (let i = 0; i < errorMessages.length; i++) {
      expect(errorMessageElement[i]).toHaveTextContent(errorMessages[i])
      expect(fields[i]).toHaveStyle({
        'border-color': '#E53E3E',
      })
    }
  })

  it('Toggles password field type', async () => {
    expect(screen.getByRole('textbox', { name: /password/i })).toHaveAttribute(
      'type',
      'password'
    )

    await user.click(screen.getByRole('button', { name: /reveal password/i }))

    expect(screen.getByRole('textbox', { name: /password/i })).toHaveAttribute(
      'type',
      'text'
    )
  })
})

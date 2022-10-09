import { render, screen, userEvent, waitScreenUpdate } from 'lib/test.utils'
import MainContainer from '..'

describe('<MainContainer />', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    render(<MainContainer />)
  })

  it('Renders the component', () => {
    expect(screen.getAllByRole('presentation').length).toBe(100)
  })

  it('Changes color of a grid on click', async () => {
    expect(screen.getByRole('presentation', { name: '1-1' })).toHaveStyle({
      'background-color': 'rgb(255, 255, 255);',
    })
    await user.click(screen.getByRole('presentation', { name: '1-1' }))
    await waitScreenUpdate()
    expect(screen.getByRole('presentation', { name: '1-1' })).toHaveStyle({
      'background-color': 'red;',
    })
  })

  it('Changes color of grid on hover', async () => {
    for (let row = 1; row < 5; row++) {
      for (let col = 1; col < 5; col++) {
        expect(
          screen.getByRole('presentation', { name: `${row}-${col}` })
        ).toHaveStyle({
          'background-color': 'rgb(255, 255, 255);',
        })
      }
    }

    await user.click(screen.getByRole('presentation', { name: '1-1' }))
    await user.hover(screen.getByRole('presentation', { name: '5-5' }))
    await waitScreenUpdate()

    for (let row = 1; row < 5; row++) {
      for (let col = 1; col < 5; col++) {
        expect(
          screen.getByRole('presentation', { name: `${row}-${col}` })
        ).toHaveStyle({
          'background-color': 'red;',
        })
      }
    }
  })

  it('Changes color of grid from two selected points', async () => {
    for (let row = 1; row < 5; row++) {
      for (let col = 1; col < 5; col++) {
        expect(
          screen.getByRole('presentation', { name: `${row}-${col}` })
        ).toHaveStyle({
          'background-color': 'rgb(255, 255, 255);',
        })
      }
    }

    await user.click(screen.getByRole('presentation', { name: '1-1' }))
    await user.click(screen.getByRole('presentation', { name: '5-5' }))
    await waitScreenUpdate()

    for (let row = 1; row < 5; row++) {
      for (let col = 1; col < 5; col++) {
        expect(
          screen.getByRole('presentation', { name: `${row}-${col}` })
        ).toHaveStyle({
          'background-color': 'red;',
        })
      }
    }
  })
})

import { ChakraProvider } from '@chakra-ui/react'
import {
  act,
  render,
  RenderOptions,
  RenderResult,
} from '@testing-library/react'

// We'll add some providers here if ever we'll be using contexts
interface AllTheProvidersProps {
  children?: React.ReactNode
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => (
  <ChakraProvider>{children}</ChakraProvider>
)

type RenderOptionsType = Omit<RenderOptions, 'queries'>

jest.setTimeout(120_000)

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptionsType
): RenderResult => {
  const { ...rest } = options || {}

  return render(ui, {
    wrapper: (props) => AllTheProviders({ ...props }),
    ...rest,
  })
}

export const waitScreenUpdate = async (timer?: number): Promise<void> => {
  // ? Wait for the lazy component to load
  await act(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, timer || 0)
      })
  )
}

// Re-export all of react testing lib here
export * from '@testing-library/react'

export { customRender as render }
export { default as userEvent } from '@testing-library/user-event'

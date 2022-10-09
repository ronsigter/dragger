import { ChakraProvider } from '@chakra-ui/react'
import NextNProgress from 'nextjs-progressbar'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <NextNProgress />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

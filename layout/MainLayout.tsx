import { Box, Center, Container } from '@chakra-ui/react'

type MainLayoutProps = {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container h='100vh' w='100%'>
      <Center h='100%' w='100%' px='4'>
        {children}
      </Center>
    </Container>
  )
}

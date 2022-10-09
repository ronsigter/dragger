import { Container } from '@chakra-ui/react'

type MainLayoutProps = {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <Container>{children}</Container>
}

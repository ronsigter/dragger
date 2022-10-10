import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useAuth } from 'hooks'
import Router from 'next/router'
import { Routes } from 'routes'
import { GridBox } from './components'

export const Main: React.FC = () => {
  const rows = Array.from({ length: 10 })
  const columns = Array.from({ length: 10 })
  const { logout } = useAuth()

  const handleSignOut = (): void => {
    logout()
    Router.push(Routes.LOGIN)
  }

  return (
    <Box>
      <Box border='solid 1px black'>
        {rows.map((_arr, r) => (
          <Grid key={r} templateColumns='repeat(10, 1fr)'>
            {columns.map((_arr, c) => (
              <GridItem
                key={c}
                role='presentation'
                aria-label={`${r + 1}-${c + 1}`}
              >
                <GridBox row={r + 1} column={c + 1} />
              </GridItem>
            ))}
          </Grid>
        ))}
      </Box>
      <Box textAlign='center' py='10'>
        <Button onClick={handleSignOut}>Sign out</Button>
      </Box>
    </Box>
  )
}

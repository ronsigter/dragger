import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { PasswordField } from './components'

export const Login: React.FC = () => {
  return (
    <Box w='100%'>
      <Stack spacing='4' as='form' id='login-form'>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' />
        </FormControl>
        <PasswordField />
      </Stack>
      <Box pt='10'>
        <Button w='100%' colorScheme='blue' type='submit' form='login-form'>
          Sign in
        </Button>
      </Box>
    </Box>
  )
}

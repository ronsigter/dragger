import { Box, Button, Stack, useToast } from '@chakra-ui/react'
import { useAuth } from 'hooks'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { Routes } from 'routes'
import { EmailField, PasswordField } from './components'
import type { FormType } from './components/type'

export const Login: React.FC = () => {
  const router = useRouter()
  const methods = useForm<FormType>()
  const { login } = useAuth()
  const toaster = useToast({
    position: 'top',
  })

  const handleOnSubmit = async (form: FormType) => {
    try {
      await login(form)
      toaster({
        title: 'Authentication',
        description: 'Login successful.',
        status: 'success',
      })
      router.push(Routes.MAIN)
    } catch (error) {
      toaster({
        title: 'Authentication',
        description: 'Login unsuccessful.',
        status: 'error',
      })
    }
  }

  return (
    <Box w='100%'>
      <FormProvider {...methods}>
        <Stack
          spacing='4'
          as='form'
          id='login-form'
          onSubmit={methods.handleSubmit(handleOnSubmit)}
        >
          <EmailField />
          <PasswordField />
        </Stack>
      </FormProvider>
      <Box pt='10'>
        <Button
          w='100%'
          colorScheme='blue'
          type='submit'
          form='login-form'
          isLoading={methods.formState.isSubmitting}
        >
          Sign in
        </Button>
      </Box>
    </Box>
  )
}

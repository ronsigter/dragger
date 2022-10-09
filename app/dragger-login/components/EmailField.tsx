import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { FormType } from './type'

export const EmailField: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormType>()

  return (
    <FormControl isInvalid={!!errors.email}>
      <FormLabel>Email</FormLabel>
      <Input
        focusBorderColor='none'
        {...register('email', {
          required: 'Please enter your email',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Please enter a valid email address',
          },
        })}
      />
      <FormErrorMessage role='presentation' aria-label='form-error-message'>
        {errors?.email?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

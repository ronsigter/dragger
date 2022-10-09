import { useRef } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { useFormContext } from 'react-hook-form'
import type { FormType } from './type'

export const PasswordField: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormType>()
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <FormControl isInvalid={!!errors.password}>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          role='textbox'
          type={isOpen ? 'text' : 'password'}
          autoComplete='current-password'
          {...register('password', {
            required: 'Please enter your password',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          focusBorderColor='none'
        />
        <InputRightElement>
          <IconButton
            variant='link'
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage role='presentation' aria-label='form-error-message'>
        {errors?.password?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

import { forwardRef, useRef } from 'react'
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export const PasswordField: React.FC = forwardRef<HTMLInputElement, InputProps>(
  function Field(_props, ref) {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }

    return (
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            ref={mergeRef}
            type={isOpen ? 'text' : 'password'}
            autoComplete='current-password'
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
      </FormControl>
    )
  }
)

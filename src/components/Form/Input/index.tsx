import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInputProps {
  label: string;
  register: UseFormRegisterReturn<string>;
  type: 'text' | 'email' | 'password';
  placeholder?: string;
  error?: FieldError;
}

const Input = ({ label, register, error, type }: IInputProps) => (
  <fieldset>
    <StyledTextField label={label} {...register} type={type} />
    {error ? (
      <StyledParagraph fontColor='red'>{error.message}</StyledParagraph>
    ) : null}
  </fieldset>
);

export default Input;

import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';

import {
  IRegisterFormValues,
  UserContext,
} from '../../../providers/UserContext';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>();

  const { userRegister } = useContext(UserContext);

  const submitRegister: SubmitHandler<IRegisterFormValues> = (
    formData: IRegisterFormValues
  ) => {
    userRegister(formData);
    console.log(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submitRegister)}>
      <Input
        label='Nome'
        type='text'
        register={register('name')}
        error={errors.name}
      />
      <Input
        label='Email'
        type='email'
        register={register('email')}
        error={errors.email}
      />
      <Input
        label='Senha'
        type='password'
        register={register('password')}
        error={errors.password}
      />
      <Input
        label='Confirme a senha'
        type='text'
        register={register('password')}
        error={errors.password}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;

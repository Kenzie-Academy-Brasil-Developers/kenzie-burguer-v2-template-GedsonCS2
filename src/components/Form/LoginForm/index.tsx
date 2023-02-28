import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  IRegisterFormValues,
  UserContext,
} from '../../../providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>();

  const { userLogin } = useContext(UserContext);

  const submitLogin: SubmitHandler<IRegisterFormValues> = (
    formData: IRegisterFormValues
  ) => {
    userLogin(formData);
    console.log(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submitLogin)}>
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
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;

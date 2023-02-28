import * as yup from 'yup';

export const registerFormSchema = yup.object().shape({
  name: yup.string().required('O nome é Obrigatório'),
  email: yup
    .string()
    .required('O email é Obrigatório')
    .email('O email digitado é inválido'),
  password: yup
    .string()
    .required('A Senha é Obrigatória')
    .matches(/.{6,}/, 'Deve conter no mínimo 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Confirmar a senha é Obrigatório')
    .oneOf([yup.ref('password')], 'As senhas não correspondem'),
});

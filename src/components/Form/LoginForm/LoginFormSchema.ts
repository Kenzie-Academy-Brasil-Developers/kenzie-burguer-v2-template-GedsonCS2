import * as yup from 'yup';

export const loguinFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('O email é Obrigatório')
    .email('O emaildigitado é inválido'),
  password: yup.string().required('A Senha é Obrigatória'),
});

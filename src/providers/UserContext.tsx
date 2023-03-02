import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { api } from '../services/api';

import 'react-toastify/dist/ReactToastify.css';

export interface IDefautProviderProps {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IRegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IloginFormValues {
  email: string;
  password: string;
}

export interface IUserContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  userRegister: (formData: IRegisterFormValues) => Promise<void>;
  userLogin: (formData: IloginFormValues) => Promise<void>;
  userLogout: () => void;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  opemModal: boolean;
  setOpenmodal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IDefautProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [opemModal, setOpenmodal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userLogadoId = localStorage.getItem('@USERID');
    const userLogadoToken = localStorage.getItem('@TOKEN');

    if (userLogadoToken) {
      try {
        const userLoad = async () => {
          const response = await api.get(`/users/${userLogadoId}`, {
            headers: {
              Authorization: `Bearer ${userLogadoToken}`,
            },
          });
          setUser(response.data);
          navigate('/shop');
        };
        userLoad();
      } catch (error) {
        toast.error(`${error}`);
        setUser(null);
        localStorage.removeItem('@TOKEN');
        localStorage.removeItem('@USERID');
      }
    }
  }, []);

  const userRegister = async (formData: IRegisterFormValues) => {
    try {
      const response = await api.post('/users', formData);
      setUser(response.data.user);
      navigate('/');
      toast.success('Cadastro efetuado com Sucesso');
    } catch (error) {
      toast.error('Erro ao Realizar o cadastro');
    }
  };

  const userLogin = async (FormData: IloginFormValues) => {
    try {
      const response = await api.post('/login', FormData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@USERID', response.data.user.id);
      navigate('/shop');
      toast.success('login efetuado com Sucesso');
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USERID');
    navigate('/');
  };

  return (
    <>
      <UserContext.Provider
        value={{
          userLogout,
          loading,
          setLoading,
          user,
          setUser,
          userLogin,
          userRegister,
          setOpenmodal,
          opemModal,
        }}
      >
        {children}
      </UserContext.Provider>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
};

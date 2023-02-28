import { createContext, useEffect, useState } from 'react';
import { Await, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

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
        console.log(error);
        console.log('não logou');
      }
    }
  }, []);

  const userRegister = async (formData: IRegisterFormValues) => {
    try {
      const response = await api.post('/users', formData);
      setUser(response.data.user);
      navigate('/');
      console.log('cadastrou');
    } catch (error) {
      console.log('não cadastrou');
    }
  };

  const userLogin = async (FormData: IloginFormValues) => {
    try {
      const response = await api.post('/login', FormData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@USERID', response.data.user.id);

      console.log(response.data.user);
      navigate('/shop');
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USERID');
    navigate('/');
  };

  return (
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
  );
};

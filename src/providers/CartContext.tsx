import { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../services/api';

export interface ICardProviderProps {
  children: React.ReactNode;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface ICartContext {
  addProductToCart: (product: IProduct) => void;
  removeProductFromCart: (productId: number) => void;
  productsList: IProduct[];
  productsCart: IProduct[];
  setproductsCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
  ValueCardTotal: number;
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: ICardProviderProps) => {
  const localProductscart = localStorage.getItem('@Cart');

  const [productsList, setproductsList] = useState<IProduct[]>([]);
  const [productsCart, setproductsCart] = useState<IProduct[]>(
    localProductscart ? JSON.parse(localProductscart) : []
  );
  useEffect(() => {
    const userLogadoToken = localStorage.getItem('@TOKEN');
    const LoadProductsdata = async () => {
      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${userLogadoToken}`,
          },
        });

        setproductsList(response.data);
      } catch (error) {
        toast.error(`${error}`);
      }
    };
    LoadProductsdata();
  }, []);

  useEffect(() => {
    localStorage.setItem('@Cart', JSON.stringify(productsCart));
  }, [productsCart]);

  const addProductToCart = (product: IProduct) => {
    const index = productsCart.findIndex((val) => val.id === product.id);

    if (index < 0) {
      setproductsCart([...productsCart, product]);
      toast.success('Item adicionado ao Carrinho com sucesso');
    } else {
      toast.warning(`Item já está no Carrinho`);
    }
  };

  const removeProductFromCart = (productId: number) => {
    const newProductCart = productsCart.filter(
      (product: IProduct) => product.id !== productId
    );
    setproductsCart(newProductCart);
    toast.success('Item Removido do Carrinho com sucesso');
  };

  const ValueCart = () => {
    const arrayValue = productsCart.map((Value: IProduct) => {
      const ProductValue = Value.price;
      return ProductValue;
    });

    const resultTotal = arrayValue.reduce(
      (result, number) => result + number,
      0
    );
    return resultTotal;
  };

  const ValueCardTotal = ValueCart();

  return (
    <>
      <CartContext.Provider
        value={{
          productsList,
          addProductToCart,
          productsCart,
          setproductsCart,
          removeProductFromCart,
          ValueCardTotal,
        }}
      >
        {children}
      </CartContext.Provider>
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

import { createContext, useEffect, useState } from 'react';
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
  addProductToCart: (product: any) => void;
  removeProductFromCart: (productId: any) => void;
}

export const CartContext = createContext({});

export const CartProvider = ({ children }: ICardProviderProps) => {
  const localProductscart = localStorage.getItem('@Cart');

  const [productsList, setproductsList] = useState([]);
  const [productsCart, setproductsCart] = useState(
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
        console.log(error);
      }
    };
    LoadProductsdata();
  }, []);

  useEffect(() => {
    localStorage.setItem('@Cart', JSON.stringify(productsCart));
  }, [productsCart]);

  const addProductToCart = (product) => {
    const index = productsCart.findIndex((val) => val.id === product.id);

    if (index < 0) {
      setproductsCart([...productsCart, product]);
      console.log(productsCart);
      console.log('Produto adicionado com sucesso');
    } else {
      console.log(productsCart);
      console.log('Produto já está no carrinho');
    }
  };

  const removeProductFromCart = (productId) => {
    const newProductCart = productsCart.filter(
      (product) => product.id !== productId
    );
    setproductsCart(newProductCart);
  };

  const ValueCart = () => {
    const arrayValue = productsCart.map((Value) => {
      return Value.price;
    });

    const result = arrayValue.reduce((result, namber) => result + namber, 0);
    return result;
  };

  const ValueCardTotal = ValueCart();

  return (
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
  );
};

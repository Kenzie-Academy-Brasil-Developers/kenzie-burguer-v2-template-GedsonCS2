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
        console.log(error);
      }
    };
    LoadProductsdata();
  }, []);

  useEffect(() => {
    localStorage.setItem('@Cart', JSON.stringify(productsCart));
  }, [productsCart]);

  const addProductToCart = (product: IProduct) => {
    const index = productsCart.findIndex((val: any) => val.id === product.id);

    if (index < 0) {
      setproductsCart([...productsCart, product]);

      console.log('Produto adicionado com sucesso');
    } else {
      console.log('Produto já está no carrinho');
    }
  };

  const removeProductFromCart = (productId: number) => {
    console.log(productId);
    const newProductCart = productsCart.filter(
      (product: IProduct) => product.id !== productId
    );
    setproductsCart(newProductCart);
  };

  const ValueCart = () => {
    const arrayValue = productsCart.map((Value: IProduct) => {
      const ProductValue = Value.price;
      return ProductValue;
    });

    const resultTotal = arrayValue.reduce(
      (result: any, number: number) => result + number,
      0
    );
    return resultTotal;
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

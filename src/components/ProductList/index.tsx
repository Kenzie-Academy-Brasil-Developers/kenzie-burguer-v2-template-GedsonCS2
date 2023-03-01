import { useContext } from 'react';

import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext, IProduct } from '../../providers/CartContext';

const ProductList = () => {
  const { productsList } = useContext(CartContext);

  return (
    <StyledProductList>
      {productsList.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledProductList>
  );
};

export default ProductList;

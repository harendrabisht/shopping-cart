import { memo } from "react";

import Product from "./product";
import { Product as ProductType } from "../../store/products";

type ProductListProps = {
  products: ProductType[];
  handleAddToCart: (product: ProductType) => void;
};

const ProductList = ({ products, handleAddToCart }: ProductListProps) => {
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-3 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
              <Product
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ProductList);

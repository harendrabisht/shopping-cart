import { useEffect } from "react";
import { fetchData } from "../../store/service";
import Product from "./product";
import { updateProducts } from "../../store/common-store";
// import { updateProducts } from "../../store/products";
import { useAppSelector, useAppDispatch } from "../../store";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    // Fetch products from the API
    const response = await fetchData("/products", {});
    if (response.status === 200) {
      const { data } = response;
      const { products, ...rest } = data;
      dispatch(updateProducts({ ...rest, data: products }));
    }
  };
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-3 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.data?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;

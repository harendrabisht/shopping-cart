import { useCallback, useEffect } from "react";
import ProductList from "../components/products/productList";
import { useAppDispatch, useAppSelector } from "../store";
import { Product, ProductsPayload, updateProducts } from "../store/products";
import { createData } from "../store/service";
import { mergeCart, updateCart } from "../store/cart";
import { fetchData } from "../store/service";

const ProductContainer = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.user);
  const products: ProductsPayload = useAppSelector((state) => state.products);
  const { data } = products;

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

  const handleAddToCart = useCallback(async (product: Product) => {
    // Logic to add the product to the cart
    const response = await createData("/carts/add", {
      userId: user?.id,
      products: [{ id: product.id, quantity: 1 }],
    });
    if (response.status === 201) {
      dispatch(updateCart(response.data));
    }
  }, []);

  return <ProductList products={data} handleAddToCart={handleAddToCart} />;
};

export default ProductContainer;

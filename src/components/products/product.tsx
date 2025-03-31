import { useAppDispatch, useAppSelector } from "../../store";
import { mergeCart, updateCart } from "../../store/common-store";
import { createData } from "../../store/service";

const Product = ({ product }: { product: any }) => {
  const user = useAppSelector((state) => state.user);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // handle add to cart
  const handleAddToCart = async () => {
    // Logic to add the product to the cart
    const response = await createData("/carts/add", {
      userId: user?.id,
      products: [{ id: product.id, quantity: 1 }],
    });
    if (response.status === 201) {
      if (cart?.id) {
        dispatch(mergeCart(response.data));
      } else {
        dispatch(updateCart(response.data));
      }
    }
  };
  return (
    <div key={product.id} className="group">
      <img
        alt={product.title}
        src={product.thumbnail}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-60"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute" />
              {product.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
      <div className="w-full flex justify-between">
        <button className="text-indigo-600" onClick={handleAddToCart}>
          View Item
        </button>
        <button
          className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default Product;

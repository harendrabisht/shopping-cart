import { useEffect, useState, useCallback } from "react";
import Login from "./components/login";
import { fetchData } from "./store/service";
import { RootState, useAppDispatch, useAppSelector } from "./store";
import { updateUser, updateCart } from "./store/common-store";
import Dashboard from "./components/dashboard";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state: RootState) => state.user);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await fetchData("/user/me", {});
      const { data } = response;
      setLoading(false);
      if (response.status === 200) {
        dispatch(updateUser(data));
      } else {
        dispatch(updateUser(null));
      }
    } catch (error) {
      console.error("Login failed", error?.message);
      dispatch(updateUser(null));
      setLoading(false);
    }
  };
  // Fetch the cart for the logged-in user
  const getCart = async () => {
    if (user === null) return;
    const response = await fetchData(`/carts/user/${user?.id}`, {});
    if (response.status === 200) {
      const { carts } = response.data;
      if (carts.length > 0) {
        dispatch(updateCart(carts[0]));
      }
    }
  };
  useEffect(() => {
    getCart();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{user ? <Dashboard /> : <Login />}</>;
}

export default App;

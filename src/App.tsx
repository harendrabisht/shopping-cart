import { useEffect, useState } from "react";
import Login from "./components/login";
import { fetchData, getToken } from "./store/service";
import { RootState, useAppDispatch, useAppSelector } from "./store";
import { updateUser, initialState } from "./store/user";
import Dashboard from "./components/dashboard";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state: RootState) => state.user);
  const token = getToken();
  useEffect(() => {
    if (token) {
      getUser();
    }
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
        dispatch(updateUser(initialState));
      }
    } catch (error) {
      console.error("Login failed", error?.message);
      dispatch(updateUser(initialState));
      setLoading(false);
    }
  };
  // Fetch the cart for the logged-in user
  const getCart = async () => {
    if (user.id === null) return;
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
  return <>{user.id ? <Dashboard /> : <Login />}</>;
}

export default App;

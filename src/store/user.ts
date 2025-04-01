import { createSlice, createAction } from "@reduxjs/toolkit";

type User = {
  id: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  image: string | null;
};

export const updateUser = createAction<User>("fetch/user/success");

export const initialState: User = {
  id: null,
  email: "",
  firstName: "",
  lastName: "",
  image: "",
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser, (state, action) => {
      const { id, email, firstName, lastName, image, username } =
        action.payload;
      state.id = id;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.image = image;
      state.username = username;
    });
  },
});

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userinfo",
  initialState: {
    name: "Athena",
    age: 22,
    sex: "male",
  },
});

export default userSlice.reducer;

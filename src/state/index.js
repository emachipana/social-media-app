import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: {},
  friend: {},
  token: null,
  posts: []
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setFriend: (state, action) => {
      state.friend = action.payload.friend;
    },
    setLogout: (state) => {
      state.user = {};
      state.token = null;
      state.posts = [];
    },
    setFriends: (state, action) => {
      if(state.user) {
        state.user.friends = action.payload.friends;
      }else {
        console.error("User friends non-existent.");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      state.posts.unshift(action.payload.post);
    },
    setUpdatedPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if(post.id === action.payload.post.id) return action.payload.post;
        return post;
      });

      state.posts = updatedPosts;
    }
  }
});

export const { 
  setMode,
  setLogin,
  setUser,
  setFriend,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUpdatedPost
} = authSlice.actions;

export default authSlice.reducer;

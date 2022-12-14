import { Box, useMediaQuery } from "@mui/material";
import NewPostWidget from "../widgets/NewPostWidget";
import UserWidget from "../widgets/UserWidget";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setPosts, setUser } from "../../state";
import UserService from "../../services/user";
import PostsWidget from "../widgets/PostsWidget";
import PostService from "../../services/post";
import FriendListWidget from "../widgets/FriendListWidget";

function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const user = await UserService.getUser(token, id);
      const friends = await UserService.getUserFriends(token, id);
      const posts = await PostService.getFeedPosts(token);

      dispatch(setUser({ user }));
      dispatch(setFriends({ friends }));
      dispatch(setPosts({ posts }));
    }

    fetch();
  }, [dispatch, id, token]);

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <NewPostWidget />
        <PostsWidget />
      </Box>
      {
        isNonMobileScreens && (
          <Box flexBasis="26%">
            <FriendListWidget />
          </Box>
        )
      }
    </Box>
  )
}

export default HomePage;

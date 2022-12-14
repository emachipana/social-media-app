import { Box, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostService from "../../services/post";
import UserService from "../../services/user";
import { setFriend, setPosts } from "../../state";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

function ProfilePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    const fetch = async () => {
      const friend = await UserService.getUser(token, id);
      const posts = await PostService.getUserPosts(token, id);

      dispatch(setFriend({ friend }));
      dispatch(setPosts({ posts }));
    }

    fetch();
  }, [token, id, dispatch]);

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="2rem"
      justifyContent="center"
    >
      <Box
        flexBasis={isNonMobileScreens ? "26%" : undefined}
      >
        <UserWidget />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "50%" : undefined}
      >
        <PostsWidget />
      </Box>
    </Box>
  );
}

export default ProfilePage;

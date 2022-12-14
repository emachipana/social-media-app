import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import PostService from "../../services/post";
import { setUpdatedPost } from "../../state";

function PostWidget({ data }) {
  const { 
    id,
    userId,
    userName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments
  } = data;

  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const { id: loggedInUserId } = useSelector((state) => state.user);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const theme = useTheme();
  const main = theme.palette.neutral.main;
  const primary = theme.palette.primary.main;

  const patchLike = async () => {
    const updatedPost = await PostService.likePost(token, id, loggedInUserId);
    dispatch(setUpdatedPost({ post: updatedPost }));
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend 
        friendId={userId}
        location={location}
        userName={userName}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        { description }
      </Typography>
      {
        picturePath && (
          <img 
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )
      }
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* likes */}
          <FlexBetween gap="2px">
            <IconButton onClick={patchLike}>
              {
                isLiked
                  ? ( <FavoriteOutlined sx={{ color: primary }} /> )
                  : ( <FavoriteBorderOutlined /> )
              }
            </IconButton>
            <Typography>{ likeCount }</Typography>
          </FlexBetween>
          
          {/* comments */}
          <FlexBetween gap="2px">
            <IconButton onClick={() => setIsComments(!isComments)} >
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{ comments.length }</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {
        isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, index) => (
              <Box key={index}>
                <Divider />
                <Typography
                  sx={{
                    color: main,
                    m: "0.5rem 0",
                    pl: "1rem"
                  }}
                >
                  { comment }
                </Typography>
              </Box>
            ))}
          </Box>
        )
      }
    </WidgetWrapper>
  );
}

export default PostWidget;

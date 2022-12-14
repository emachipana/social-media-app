import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

function Friend({ friendId, userPicturePath, userName, location }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId, friends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const primaryDark = theme.palette.primary.dark;
  const main = theme.palette.neutral.main;
  const medium = theme.palette.neutral.medium;

  const isFriend = friends.find((friend) => friend.id === friendId);
  const itsMe = userId === friendId;

  const patchFriend = async () => {
    const newFriends = await UserService.addRemoveFriend(token, userId, friendId);
    dispatch(setFriends({ friends: newFriends }));
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage 
          imagePath={userPicturePath}
          size="55px"
        />
        <Box
          onClick={() => navigate(`/profile/${friendId}`)}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: theme.palette.primary.light,
                cursor: "pointer"
              }
            }}
          >
            { userName }
          </Typography>
          <Typography
            color={medium}
            fontSize="0.75rem"
          >
            { location }
          </Typography>
        </Box>
      </FlexBetween>
      {
        !itsMe && (
          <IconButton
            onClick={patchFriend}
            sx={{
              backgroundColor: primaryLight,
              p: "0.6rem"
            }}
          >
            {
              isFriend
                ? ( <PersonRemoveOutlined sx={{ color: primaryDark }} /> )
                : ( <PersonAddOutlined sx={{ color: primaryDark }}/> )
            }
          </IconButton>
        )
      }
    </FlexBetween>
  );
}

export default Friend;

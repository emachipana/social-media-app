import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";

function FriendListWidget() {
  const { palette } = useTheme();
  const { friends } = useSelector((state) => state.user);

  return (
    <WidgetWrapper
      position="sticky"
      top="20px"
    >
      <Typography
      colot={palette.neutral.dark}
      variant="h5"
      fontWeight="500"
      sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap="1.5rem"
      >
        {
          friends.map((friend) => (
            <Friend 
              key={friend.id}
              friendId={friend.id}
              userName={`${friend.firstName} ${friend.lastName?.split(" ")[0]}`}
              location={friend.location}
              userPicturePath={friend.picturePath}
            />
          ))
        }
      </Box>
    </WidgetWrapper>
  );
}

export default FriendListWidget;

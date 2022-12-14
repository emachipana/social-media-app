import { EditOutlined, LocationOnOutlined, ManageAccountsOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";

function UserWidget() {
  const user = useSelector((state) => state.user);
  const friend = useSelector((state) => state.friend);
  const { pathname } = useLocation();
  const isProfile = pathname.split("/")[1] === "profile";
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const {
    id,
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    picturePath
  } = isProfile ? friend : user;

  return (
    <WidgetWrapper
      position={isProfile ? "relative" : "sticky"}
      top={isProfile ? "0" : "20px"}
    >
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${id}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage imagePath={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer"
                }
              }}
            >
              { `${firstName} ${lastName}` }
            </Typography>
            <Typography color={medium}>{ friends?.length } friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          mb="0.5rem"
        >
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{ location }</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
        >
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography colo={medium}>{ occupation }</Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            { viewedProfile }
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your posts</Typography>
          <Typography color={main} fontWeight="500">
            { impressions }
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography
          fontSize="1rem"
          color={main}
          fontWeight="500"
          mb="1rem"
        >
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}

export default UserWidget;

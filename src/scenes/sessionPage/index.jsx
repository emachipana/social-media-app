import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./Form";

function SessionPage() {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const alt = palette.background.alt;

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
        >
          Social App
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "35%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem" }}
        >
          Welcome to Social App, the social media for socipaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}

export default SessionPage;

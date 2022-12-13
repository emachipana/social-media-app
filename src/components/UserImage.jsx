import { Box } from "@mui/material";

function UserImage({ imagePath, size = "60px" }) {
  return (
    <Box
      width={size}
      height={size}
    >
      <img 
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${imagePath}`}
      />
    </Box>
  );
}

export default UserImage;

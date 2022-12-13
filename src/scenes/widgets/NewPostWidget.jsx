import { useTheme } from "@emotion/react";
import { AttachFileOutlined, DeleteOutlined, EditOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, InputBase, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import PostService from "../../services/post";
import { setPost } from "../../state";

function NewPostWidget() {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const theme = useTheme();
  const { id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = theme.palette.neutral.mediumMain;
  const medium = theme.palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", id);
    formData.append("description", description);

    if(image) {
      formData.append("picture", image);
    }

    const post = await PostService.createPost(token, formData);
    dispatch(setPost({ post }));
    setImage(null);
    setDescription("");
    setIsImage(false);
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage imagePath={picturePath} />
        <InputBase 
          placeholder="What's on your mind..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem"
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="8px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            onDrop={(files) => setImage(files[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${theme.palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image
                    ? ( <p>Add Image Here</p> )
                    : (
                      <FlexBetween>
                        <Typography>{ image.name }</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )
                  }
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween
          gap="0.25rem"
          onClick={() => setIsImage(!isImage)}
        >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined  sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined  sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined  sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined  sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!description}
          onClick={handlePost}
          sx={{
            color: theme.palette.background.alt,
            backgroundColor: theme.palette.primary.main,
            borderRadius: "3rem",
            "&:disabled": {
              color: medium
            }
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}

export default NewPostWidget;

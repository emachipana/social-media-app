import { useSelector } from "react-redux";
import PostWidget from "./PostWidget";

function PostsWidget() {
  const posts = useSelector((state) => state.posts);

  return (
    posts.map(({ id, ...data }) => (
      <PostWidget 
        key={id}
        data={{id, ...data}}
      />
    ))
  );
}

export default PostsWidget;

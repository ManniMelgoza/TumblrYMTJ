//this is just to test like functionality. we can totally remove it later
import LikeButton from "./Likebutton";

const TestLike = () => {
  return (
    <div>
      <h2>Testing Like Button for Post #1</h2>
      <LikeButton postId={1} />
    </div>
  );
};

export default TestLike;
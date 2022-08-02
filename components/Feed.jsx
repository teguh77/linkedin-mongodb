import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import Input from "./Input";
import Post from "./Post";

function Feed({ posts }) {
  const [realtimePosts, setRealtimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPost, setUseSSRPost] = useRecoilState(useSSRPostsState);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/posts", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const responseData = await response.json();
        setRealtimePosts(responseData);
        // digunakan untuk auto refresh ketika handlepost memiliki nilai yang berbeda (jadi agar halaman bisa terupdate tanpa refresh)
        setHandlePost(false);

        setUseSSRPost(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [handlePost]);

  return (
    <div className="max-w-lg pb-24 space-y-6">
      <Input />
      {!useSSRPost
        ? realtimePosts.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
}

export default Feed;

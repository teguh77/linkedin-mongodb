import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { handlePostState } from "../atoms/postAtom";

function Form() {
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const uploadPost = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        input,
        photoUrl,
        username: session.user.name,
        userImg: session.user.image,
        email: session.user.email,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setHandlePost(true);
    setModalOpen(false);
  };

  return (
    <form className="relative flex flex-col space-y-2 text-black/80 dark:text-white/75">
      <textarea
        rows="4"
        placeholder="What do you want to talk about?"
        className="bg-transparent dark:placeholder-white/75 focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a photo URL (optional)"
        className="max-w-xs truncate bg-transparent focus:outline-none dark:placeholder-white/75 md:max-w-sm"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button
        className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/80 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
        disabled={!input.trim() && !photoUrl.trim()}
        type="submit"
        onClick={uploadPost}
      >
        Post
      </button>
    </form>
  );
}

export default Form;

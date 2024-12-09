import { useSelector } from "react-redux";

export const usePosts = () => useSelector((state) => state.posts.posts);

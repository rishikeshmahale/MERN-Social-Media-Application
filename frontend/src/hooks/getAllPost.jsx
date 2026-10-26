import { useEffect } from "react";
import { serverURL } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPostData } from "../redux/postSlice.js";

const getAllPost = () => {

    const dispatch = useDispatch();

    useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/post/getAll`, {
          withCredentials: true,
        });

        dispatch(setPostData(result.data))
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [dispatch]);

  return <div>getCurrentUser</div>;
};

export default getAllPost;




import { useEffect } from "react";
import { serverURL } from "../App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice.js";

const getAllPost = () => {

    const dispatch = useDispatch();
    const {userData} = useSelector((state) => state.user);

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
  }, [dispatch, userData]);

  return <div>getCurrentUser</div>;
};

export default getAllPost;




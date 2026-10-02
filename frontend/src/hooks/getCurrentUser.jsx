import { useEffect } from "react";
import { serverURL } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const getCurrentUser = () => {

    const dispatch = useDispatch();

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/user/current`, {
          withCredentials: true,
        });

        dispatch(setUserData(result.data))
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [dispatch]);

  return <div>getCurrentUser</div>;
};

export default getCurrentUser;

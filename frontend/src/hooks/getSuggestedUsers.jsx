import axios from "axios";
import { useEffect } from "react"
import { serverURL } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedUsers } from "../redux/userSlice";

const getSuggestedUsers = () => {

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    useEffect(() => {

        const fetchUsers = async () => {
            try{

                const result = await axios.get(`${serverURL}/api/user/suggested`, {
                    withCredentials : true
                });

                dispatch(setSuggestedUsers(result.data))

            }catch(err){
                console.log(err);
            }
        }

        fetchUsers()

    }, [userData, dispatch]);

}

export default getSuggestedUsers
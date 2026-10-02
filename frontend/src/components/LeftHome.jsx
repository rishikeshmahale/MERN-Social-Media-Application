import logo2 from "../assets/logo2.png";
import { FaRegHeart } from "react-icons/fa6";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverURL } from "../App";
import { setUserData } from "../redux/userSlice";
import OtherUser from "./OtherUser.jsx";

const LeftHome = () => {
  const { userData, suggestedUsers } = useSelector((state) => state.user);

   const dispatch = useDispatch();

  const handleLogout = async () => {
    try{
        await axios.get(`${serverURL}/api/auth/signout`, {withCredentials : true});

       console.log("Logout Successfull!");

       dispatch(setUserData(null));

    }catch(err){
        console.log(err);
    }
  }

  return (
    <div className="w-[25%] hidden lg:block min-h-[100vh] bg-[black] border-r-2 border-gray-900">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
        <img src={logo2} alt="logo" className="w-[80px]" />
        <div>
          <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
        </div>
      </div>

      <div className="flex items-center w-full justify-between gap-[10px] px-[10px] border-b-2 border-b-gray-900 py-[10px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={userData.profileImage || dp}
              alt="dp"
              className="w-full object-cover"
            />
          </div>
          <div>
            <div className="text-[18px] text-white font-semibold">
              {userData.userName}
            </div>
            <div className="text-[15px] text-gray-400 font-semibold">
              {userData.name}
            </div>
          </div>
        </div>
        <div className="text-blue-500 font-semibold cursor-pointer" onClick={handleLogout}>Log Out</div>
      </div>

        {/* suggested Users */}
        <div className="w-full flex-col gap-[20px] p-[20px] "> 
            <h1 className="text-[white] text-[19px]">Suggested Users</h1>
            {
                suggestedUsers && suggestedUsers.slice(0,3).map((user, index) => {
                    return (
                        <OtherUser key={index} user={user}/>
                    )
                })
            }

        </div>

    </div>
  );
};

export default LeftHome;

import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] p-[20px]">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          onClick={() => navigate(`/profile/${userData.userName}`)}
          className="text-white cursor-pointer w-[25px] h-[25px]"
        />
        <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
      </div>
    </div>
  );
};

export default EditProfile;

import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.png";
import { useRef } from "react";
import { useState } from "react";
import { serverURL } from "../App.jsx";
import axios from "axios";
import { setProfileData, setUserData } from "../redux/userSlice.js";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const imageInput = useRef();

  const [frontendImage, setFrontendImage] = useState(
    userData.profileImage || dp,
  );
  const [backendImage, setBackendImage] = useState(null);

  const [name, setName] = useState(userData.name || "");
  const [userName, setUserName] = useState(userData.userName || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [profession, setProfession] = useState(userData.profession || "");
  const [gender, setGender] = useState(userData.gender || "");

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("userName", userName);
      formData.append("bio", bio);
      formData.append("profession", profession);
      formData.append("gender", gender);

      if (backendImage) {
        formData.append("profileImage", backendImage);
      }

      const result = await axios.post(
        `${serverURL}/api/user/editProfile`,
        formData,
        { withCredentials: true },
      );

      dispatch(setProfileData(result.data));
      dispatch(setUserData(result.data));
      navigate(`/profile/${userData.userName}`);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] pt-[20px]">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          onClick={() => navigate(`/profile/${userData.userName}`)}
          className="text-white cursor-pointer w-[25px] h-[25px]"
        />
        <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
      </div>

      <div
        className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
        onClick={() => imageInput.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          hidden
          onChange={handleImage}
        />
        <img src={frontendImage} alt="dp" className="w-full object-cover" />
      </div>

      <div
        className="text-blue-500 text-center text-[18px] font-semibold cursor-pointer"
        onClick={() => imageInput.current.click()}
      >
        Change Your Profile Picture
      </div>

      {/* name */}
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] text-white font-semibold bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none"
        placeholder="Enter Your Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      {/* username */}
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] text-white font-semibold bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none"
        placeholder="Enter Your Username"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />

      {/* Bio */}
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] text-white font-semibold bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none"
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
      />

      {/* Profession */}
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] text-white font-semibold bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none"
        placeholder="Profession"
        onChange={(e) => setProfession(e.target.value)}
        value={profession}
      />

      {/* Gender */}
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] text-white font-semibold bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none"
        placeholder="Gender"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      />

      <button
        className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-[white] cursor-pointer rounded-2xl"
        onClick={handleEditProfile}
      >
        {loading ? <ClipLoader size={30} color="black" /> : "Save Profile"}
      </button>
    </div>
  );
};

export default EditProfile;

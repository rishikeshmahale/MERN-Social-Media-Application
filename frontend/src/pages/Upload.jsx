import { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();

  const [uploadType, setUploadType] = useState("post");

  return (
    <div className="w-full h-[100vh] bg-black flex flex-col items-center">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          onClick={() => navigate("/")}
          className="text-white cursor-pointer w-[25px] h-[25px]"
        />
        <h1 className="text-white text-[20px] font-semibold">Upload Media</h1>
      </div>

      <div className="w-[90%] max-w-[600px] h-[80px] bg-[white] rounded-full flex justify-around items-center gap-[10px]">
        <div
          className={`${uploadType == "post" ? "bg-black shadow-2xl text-white shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold rounded-full hover:bg-black hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("post")}
        >
          Post
        </div>

        <div
          className={`${uploadType == "story" ? "bg-black shadow-2xl text-white shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold rounded-full hover:bg-black hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("story")}
        >
          Story
        </div>

        <div
          className={`${uploadType == "loop" ? "bg-black shadow-2xl text-white shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold rounded-full hover:bg-black hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("loop")}
        >
          Loop
        </div>
      </div>
    </div>
  );
};

export default Upload;

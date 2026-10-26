import { useSelector } from "react-redux";
import dp from "../assets/dp.png";
import VideoPlayer from "./VideoPlayer";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { GoBookmarkFill } from "react-icons/go";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

const Post = ({ postData }) => {
  console.log("postData :", postData);

  const { userData } = useSelector((state) => state.user);

  const [showComments, setShowComments] = useState(true);

  return (
    <div className="w-[90%] min-h-[450px] flex flex-col gap-[10px] bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl">
      <div className="w-full h-[80px] flex justify-between items-center px-[10px]">
        <div className="flex justify-center items-center md:gap-[20px] gap-[10px]">
          <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={postData.author?.profileImage || dp}
              alt="dp"
              className="w-full object-cover"
            />
          </div>
          <div className="w-[150px] font-semibold truncate">
            {postData?.author?.userName}
          </div>
        </div>

        <button className="px-[10px] w-[60px] md:w-[80px] py-[5px] h-[30px] md:h-[40px] bg-[black] text-white rounded-2xl text-[14px] md:text-[16px]">
          Follow
        </button>
      </div>

      <div className="w-[90%] flex items-center justify-center">
        {postData.mediaType == "image" && (
          <div className="w-[90%] h-[250px] flex items-center justify-center">
            <img
              src={postData.media}
              alt="frontend media"
              className="h-[100%] rounded-2xl max-w-full object-cover"
            />
          </div>
        )}

        {postData.mediaType == "video" && (
          <div className="w-[90%] h-[250px] flex items-center justify-center">
            <VideoPlayer media={postData.media} />
          </div>
        )}
      </div>

      <div className="w-full h-[60px] flex justify-between items-center px-[20px] mt-[10px]">
        <div className="flex justify-center items-center gap-[10px]">
          {/* like */}
          <div className="flex justify-center items-center gap-[5px]">
            {!postData?.likes.includes(userData._id) && (
              <GoHeart className="w-[25px] cursor-pointer h-[25px]" />
            )}

            {postData?.likes.includes(userData._id) && (
              <GoHeartFill
                className="w-[25px] cursor-pointer h-[25px]"
                text-red-600
              />
            )}

            <span>{postData?.likes?.length}</span>
          </div>
          {/* Comment */}
          <div className="flex justify-center items-center gap-[5px]">
            <MdOutlineComment className="w-[25px] cursor-pointer h-[25px]" />
            <span>{postData?.likes?.length}</span>
          </div>
        </div>
        {/* save */}
        <div>
          {!userData?.save?.includes(postData?._id) && (
            <MdOutlineBookmarkBorder />
          )}
          {userData?.save?.includes(postData?._id) && <GoBookmarkFill />}
        </div>
      </div>

      {postData?.caption && (
        <div className="w-full px-[20px] gap-[10px] flex justify-start items-center">
          <h1>{postData?.author?.userName}</h1>
          <div>{postData?.caption}</div>
        </div>
      )}

      {showComments && (
        <div className="w-full flex flex-col gap-[30px] pb-[20px]">
          <div className="w-full h-[80px] flex items-center justify-between px-[20px] relative">
            <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
              <img
                src={postData.author?.profileImage || dp}
                alt="dp"
                className="w-full object-cover"
              />
            </div>
            <input
              type="text"
              className="px-[10px] border-b-2 border-b-gray-500 w-[90%] outline-none h-[40px]" placeholder="write comment...."
            />
            <button className="absolute right-[20px] cursor-pointer">
              <IoSendSharp className="w-[25px] h-[25px]"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

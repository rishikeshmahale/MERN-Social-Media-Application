import dp from "../assets/dp.png";
import VideoPlayer from "./VideoPlayer";

const Post = ({ postData }) => {

  console.log("postData :", postData);

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
          <div className="w-[150px] font-semibold truncate">{postData?.author?.userName}</div>
        </div>

        <button className="px-[10px] w-[60px] md:w-[80px] py-[5px] h-[30px] md:h-[40px] bg-[black] text-white rounded-2xl text-[14px] md:text-[16px]">Follow</button>

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
            <div></div>
            <div></div>
          </div>

    </div>
  );
};

export default Post;

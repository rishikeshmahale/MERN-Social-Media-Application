import logo2 from "../assets/logo2.png";
import { FaRegHeart } from "react-icons/fa6";
import StoryDp from "./StoryDp.jsx"
import Nav from "./Nav.jsx";

const Feed = () => {
  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
        <img src={logo2} alt="logo" className="w-[80px]" />
        <div>
          <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
        </div>
      </div>

        {/* Story */}
        <div className="flex w-full overflow-auto gap-[10px] items-center">
            <StoryDp userName={"Jeffery Epstein nmsahekhnj"}/>
            <StoryDp userName={"Jeffery"}/>
            <StoryDp userName={"Jeffery"}/>
            <StoryDp userName={"Jeffery"}/>
            <StoryDp userName={"Jeffery"}/>
            <StoryDp userName={"Jeffery"}/>
            <StoryDp userName={"Jeffery"}/>
            <StoryDp userName={"Jeffery"}/>
            <StoryDp userName={"Jeffery"}/>
            <StoryDp userName={"Jeffery"}/>
            <StoryDp userName={"Jeffery"}/>
        </div>

        {/* Post */}

        <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] mt-[20px] bg-white rounded-t-[60px] relative pb-[120px]">
            
            <Nav/>

        </div>

    </div>
  );
};

export default Feed;
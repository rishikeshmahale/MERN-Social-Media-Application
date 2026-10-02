import LeftHome from "../components/LeftHome.jsx";
import RightHome from "../components/RightHome.jsx";
import Feed from "../components/Feed.jsx";

const Home = () => {
  return (
    <div className="w-full flex justify-center items-start">
        <LeftHome />
        <Feed />
        <RightHome />
    </div>
  )
}

export default Home
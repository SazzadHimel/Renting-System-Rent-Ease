import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Merchants from "./merchants";

const Home = () => {
  const { keyword } = useParams();
  return (
    <>
      {!keyword ? <Header /> : null}
      {!keyword ? <Merchants /> : null}
    </>
    
  );
};

export default Home;

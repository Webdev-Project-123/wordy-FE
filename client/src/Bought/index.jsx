import React, { useEffect, useState, useContext } from "react";
import Header from "../Home/Header";
import Table from "./components/table";
import Total from "./components/total";
import { isLoginContext } from "../GloblalContext/context";
// import { useDispatch, useSelector } from "react-red  ux";
// import { actListOrder } from './modules/action';
import getBoughtLishApi from "../apiClient/getBoughtLishApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Home/Footer";
export default function Bought() {
  //  let dispatch=useDispatch();
  const [isLogin] = useContext(isLoginContext);
  const [state, setState] = useState([]);
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

  const getBouthApi = async () => {
    try {
      const res = await getBoughtLishApi.get(userID);
      console.log(res);
      setState(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userID) {
      const currBought = JSON.parse(localStorage.getItem("bought")) || [];
      setState(currBought);
    } else {
      getBouthApi();
    }
  }, []);

  //  console.log(state);
  return (
    <div>
      <Header />
      <div className="container mx-auto min-h-screen pt-5 font-robotoS">
        <h1 className="text-center py-4 ">All orders</h1>
        <Table orders={state} />
      </div>
      <Footer />
    </div>
  );
}

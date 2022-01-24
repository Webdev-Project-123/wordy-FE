import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import ProductThumb from "../Home/ProductThumb";

import searchProductApi from "../apiClient/searchProductApi";
const SearchPage = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [productData, setProducts] = useState();
  const [searchParams] = useSearchParams();

  const getProduct = async (categories) => {
    try {
      const res = await searchProductApi.get(categories);
      console.log(res);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const pathName = searchParams.get("name");
    getProduct(pathName);
    setSearchTitle(pathName);
  }, [searchParams.get("name")]);

  return (
    <div className="bg-[#FCECDD] ">
      <Header />
      <div className="px-2 sm:px-16 py-4 mb-4">
        <h1 className="text-center mt-2 sm:mt-4 text-2xl">
          Search results for <b>{searchTitle}</b>
        </h1>
        <div className="py-4 sm:py-8 w-full">
          <div className="hot-deal rounded-lg">
            {productData?.map((data, index) => (
              <ProductThumb key={index} productData={data} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;

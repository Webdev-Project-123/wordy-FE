import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import Filter from "./Filter";
import PaginationBar from "./PaginationBar";
import PaginationPage from "./PaginationPage";
import getCategoriesApi from "../apiClient/getCategoriesApi";

const ProductPage = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const productsPerPage = 8;
  const [currCategory, setCurrCategory] = useState("ALL PRODUCTS");

  const currProducts = products?.slice(
    (currPage - 1) * productsPerPage,
    currPage * productsPerPage
  );

  const paginate = (pageNumber) => setCurrPage(pageNumber);
  const navigate = useNavigate();

  const getProduct = async (categories) => {
    try {
      const res = await getCategoriesApi.get(categories);
      console.log(res);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct("all");
  }, []);

  useEffect(() => {
    if (window.location.pathname.slice(0, 11) !== "/categories") return;
    const pathName = window.location.pathname.slice(12);
    setCurrCategory(
      pathName ? decodeURI(pathName).toUpperCase() : "ALL PRODUCTS"
    );
    getProduct(pathName);
    setCurrPage(1);
  }, [navigate]);

  return (
    <div className="bg-[#FCECDD]">
      <Header />
      <div className="my-4 sm:my-8 flex md:flex-row flex-col gap-4">
        {/* Left Content */}
        <div>
          {/* Filter */}
          <Filter />

          {/* Clear filter */}
          <div className="mx-2 sm:mx-16 mt-4 md:mr-0">
            <Link to="/categories">
              <button
                className="w-full text-center h-8 text-sm p-auto rounded-lg
            hover:opacity-70 bg-[#FF6701] transition duration-300 text-white"
              >
                Clear Filter
              </button>
            </Link>
          </div>
        </div>
        {/* Right Content */}
        <div className="mx-2 sm:mx-16 md:mr-16 md:ml-0">
          <div className="text-center text-xl font-bold p-2 rounded-t-lg bg-[#FEA82F]">
            {currCategory}
          </div>
          {/* Product List */}
          <div className="bg-white rounded-b-lg">
            <PaginationPage products={currProducts} loading={false} />
          </div>

          {/* Pagination Bar */}
          <PaginationBar
            productsPerPage={productsPerPage}
            numOfProducts={products?.length}
            paginate={paginate}
            currPage={currPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

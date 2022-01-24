import { useEffect, useState } from "react";

import getProductAddListApi from "../../apiClient/getProductAddListApi";

function ListProduct({ handleToggleList }) {
  useEffect(() => {
    window.onclick = () => {
      handleToggleList();
    };
    return () => {
      window.onclick = () => {};
    };
  }, []);

  const [initialData, setInitialData] = useState([
    {
      id: 1,
      name: "name1",
      uploadDate: "1-1-1",
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductAddListApi.get();
        console.log(res);
        setInitialData(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="absolute overflow-x-hidden w-screen h-screen flex justify-center items-center z-50 bg-[rgba(0,0,0,0.6)] font-robotoS">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative md:w-4/5 w-[95%] h-4/5 flex justify-center items-center bg-[#fff4e4] rounded-md"
      >
        <button
          onClick={handleToggleList}
          className="absolute right-7 top-5 w-auto h-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="ld:w-4/5 md:w-[90%] w-full md:px-0 px-2 h-4/5 flex items-center flex-col overflow-y-scroll">
          {initialData.map(
            ({ productId, productName, productUploadDate }, index) => {
              return (
                <div
                  className={`w-full h-auto py-4 flex ${
                    index % 2 === 0 ? "bg-[#fff4e6]" : "bg-[#f5e9d8]"
                  }`}
                >
                  <p className="w-[20%] text-center p-5">{productId}</p>
                  <p className="w-[60%] text-left border-l border-r border-[#421f1f] p-5">
                    {productName}
                  </p>
                  <p className="w-[20%] text-center p-5">{productUploadDate}</p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
export default ListProduct;

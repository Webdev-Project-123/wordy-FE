import { useContext, useLayoutEffect, useState, useEffect } from "react";
import { CartContext } from "../GloblalContext/CartContext";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import { addToCart } from "../Home/ProductThumb";
import { useParams } from "react-router-dom";
import "./Style/custom.css";
import getUserCartApi from "../apiClient/getUserCartApi";
import deleteUserCartApi from "../apiClient/deleteUserCartApi";
import purchaseProductApi from "../apiClient/purchaseProductApi";
import addUserCartApi from "../apiClient/addUserCartApi";

export const CartItem = ({
  product,
  changeItemCount,
  handleDeleteItem,
  handleSelect,
}) => {
  const [itemCount, setItemCount] = useState(product?.productQuantity);

  return (
    <div className="flex bg-[#fff] justify-center items-center  mt-[2%] min-h-[100px] h-max w-[95%] rounded-xl ">
      <div className="mr-2 rounded-full w-auto h-auto">
        <button
          className="rounded-full w-auto h-auto"
          onClick={() => {
            handleSelect(product);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 rounded-full ${
              product?.select ? "bg-[#5db324]" : "bg-none"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <div className="my-2 ml-2 font-ubuntu lg:min-w-[650px] md:min-w-[650px] min-w-[75%]">
        <div className="flex flex-wrap">
          <p className="font-bold">ID:</p>
          <p className="ml-[5px]">{product?.productID || product?.id}</p>
        </div>
        <div className="flex lg:max-w-[600px] md:max-w-[600px] max-w-[250px] ">
          <p className="font-bold">Name: </p>
          <p className="ml-[5px] element">
            {product?.productName || product?.title}
          </p>
        </div>
        <div className="flex flex-wrap ">
          <p className="font-bold">Prices:</p>
          <p className="ml-[5px] font-bold text-red-600">
            {product?.productPrice || product?.discount} $
          </p>
          <p className="">/product</p>
        </div>
        <div className="flex  ">
          <p className="mr-[5px] font-bold">Quantities: </p>
          {/* DEC */}
          <button
            onClick={() => changeItemCount(-1, product)}
            className="cursor-pointer ml-[20px] border-solid border-2 border-amber-500 rounded-2xl hover:bg-amber-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 12H6"
              />
            </svg>
          </button>
          <p className="ml-[20px]">
            {product?.productQuantity || product?.quantity}
          </p>
          {/* INC */}
          <button
            onClick={() => changeItemCount(1, product)}
            className="cursor-pointer ml-[20px] border-solid border-2 border-amber-500 rounded-2xl hover:bg-amber-500 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-center w-auto items-center ml-5 ">
        {/* DEL */}
        <button
          onClick={() => {
            handleDeleteItem(product);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

function YourCart() {
  const [cart, setCart] = useContext(CartContext);
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const userID = localStorage.getItem("userID");
  const [del, setDel] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserCartApi.get(userID);
        console.log(res);
        setCart(res.cart);
        localStorage.setItem("cart", JSON.stringify(res.cart));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [del]);

  useEffect(() => {
    let currCart = cart;
    if (!userID) {
      currCart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    const totalQuantity = currCart.reduce((sum, el) => {
      if (el?.select) return sum + el.productQuantity;
      return sum + 0;
    }, 0);
    const totalMoney = currCart
      .reduce((sum, el) => {
        if (el?.select) return sum + el.productPrice * el.productQuantity;
        return sum + 0;
      }, 0)
      ?.toFixed(3);

    setTotalMoney(totalMoney);
    setTotalQuantity(totalQuantity);
  });

  const apiDelete = async (userId, payload) => {
    try {
      const res = await deleteUserCartApi.delete(userId, payload);
      console.log(res);
      setDel((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = (product) => {
    let currCart = cart;
    if (!userID) {
      currCart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    const id = product.ID || product.id;
    console.log(id);
    apiDelete(userID, { id: id });
    const newCart = currCart.filter((element) => {
      return (
        element.productName === product.productName ||
        element.title === product.title
      );
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const apiAddToBought = async (userID, payload) => {
    try {
      const res = await purchaseProductApi.put(userID, payload);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const addToBought = () => {
    let currCart = cart;
    if (!userID) {
      currCart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    let newCart = [];
    let currBought = [];
    if (!userID) {
      currBought = JSON.parse(localStorage.getItem("bought")) || [];
    }
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    currCart.forEach((element, index) => {
      if (element?.select) {
        currBought.push({
          id: +element.productID,
          title: element.productName,
          discount: +element.productPrice,
          quantity: +element.productQuantity,
          // date: `${date}-${month}-${year}`,
        });
      } else {
        newCart.push(element);
      }
    });
    console.log(currBought);
    apiAddToBought(userID, currBought);

    localStorage.setItem("cart", JSON.stringify(newCart));
    localStorage.setItem("bought", JSON.stringify(currBought));
    setCart(newCart);
  };

  const handleSelect = (product) => {
    let currCart = cart;
    if (!userID) {
      currCart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    currCart.forEach((element) => {
      if (
        product.productName === element.productName ||
        product.title === element.title
      ) {
        if (!element.select) element.select = true;
        else element.select = false;
      }
    });

    localStorage.setItem("cart", JSON.stringify(currCart));
    setCart(currCart);
  };

  const changeItemCount = (value, product) => {
    let currCart = cart;
    if (!userID) {
      currCart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    currCart.forEach((element) => {
      if (value < 0) {
        if (
          element.productName === product.productName &&
          element.productQuantity > 1
        ) {
          element.productQuantity += value;
        }
      } else {
        if (element.productName === product.productName)
          element.productQuantity += value;
      }
    });

    localStorage.setItem("cart", JSON.stringify(currCart));
    setCart(currCart);
  };

  return (
    <div className="lg:text-lg md:text-md text-sm">
      <Header />

      <div className="bg-[#FFC288] h-max min-h-[650px]">
        <div className=" font-serif font-bold lg:text-4xl md:text-4xl text-2xl text-center p-6  text-rose-900">
          Your cart.
        </div>

        <div className="flex flex-wrap justify-center ">
          <div className=" flex flex-col  items-center lg:w-[800px] w-[99%] lg:mt-0 ">
            {cart.map((item, index) => {
              return (
                <CartItem
                  product={item}
                  changeItemCount={changeItemCount}
                  handleDeleteItem={handleDeleteItem}
                  handleSelect={handleSelect}
                />
              );
            })}
            {/* ----- */}
          </div>
          {/* Order Detail */}
          <div className=" rounded-xl lg:ml-[3%] lg:mt-[15px] mt-[5%] bg-[#fff] min-h-[100px]  h-max lg:w-[25%] w-[90%] ">
            <h1 className="text-center mt-[10px] font-bold text-sky-500 font-xl">
              Order detail
            </h1>
            <div className="flex ml-[10px] mt-[10px]">
              <p className="font-bold">Total quantitiy:</p>
              <p className="ml-[10px]">{totalQuantity || 0}</p>
            </div>
            <div className="flex ml-[10px] mt-[10px]">
              <p className="font-bold">Total money:</p>
              <p className="ml-[10px]">{totalMoney || 0}$</p>
            </div>
            <div className="flex justify-center my-[20px]">
              <button
                onClick={addToBought}
                className="cursor-pointer px-3 bg-red-600 text-white border-solid border-2 border-amber-500 rounded-xl hover:bg-amber-500"
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default YourCart;

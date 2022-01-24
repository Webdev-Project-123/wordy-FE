import Component1 from "./Component1";
import Component2 from "./Component2";
import Average from "./Average";
import SumStar from "./SumStar";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import getProductApi from "../apiClient/getProductApi";

// const item = {
//   id: 1,
//   "uploaded-date": "2022-02-30",
//   "publication-date": "2019-05-24",
//   authors: ["Austin Govella"],
//   "publishing-company": "O'Reilly Media, Inc.",
//   language: "English",
//   title: "Collaborative Product Design",
//   description:
//     "<span><div><p>You can launch a new app or website in days by piecing together frameworks and hosting on AWS. Implementation is no longer the problem. But that speed to market just makes it tougher to confirm that your team is actually building the right product.</p><p>Ideal for agile teams and lean organizations, this guide includes 11 practical tools to help you collaborate on strategy, user research, and UX. Hundreds of real-world tips help you facilitate productive meetings and create good collaboration habits. Designers, developers, and product owners will learn how to build better products much faster than before.</p><p>Topics include:</p><ul><li><b>Foundations for collaboration and facilitation:</b> Learn how to work better together with your team, stakeholders, and clients</li><li><b>Project strategy:</b> Help teams align with shared goals and vision</li><li><b>User research and personas:</b> Identify and understand your users and share that vision with the broader organization</li><li><b>Journey maps:</b> Build better touchpoints that improve conversion and retention</li><li><b>Interfaces and prototypes:</b> Rightsize sketches and wireframes so you can test and iterate quickly</li></ul></div></span>",
//   pages: 468,
//   image: "https://learning.oreilly.com/library/cover/9781491975022/750w/",
//   price: 35.49,
//   "in-stock": 100,
//   discount: 30.49,
//   rating: [50, 10, 0, 0, 0],
//   comments: [
//     {
//       avatar: "https://daisyui.com/tailwind-css-component-profile-3@56w.png",
//       content: "Excellent!",
//       stars: 5,
//       name: "Peter",
//     },
//     {
//       avatar: "https://daisyui.com/tailwind-css-component-profile-3@56w.png",
//       content: "Highly recommended!",
//       stars: 4,
//       name: "Jessica",
//     },
//     {
//       avatar: "https://daisyui.com/tailwind-css-component-profile-3@56w.png",
//       content: "I had to return for a refund due to the poor quality.",
//       stars: 1,
//       name: "Thomas Edison",
//     },
//   ],
//   categories: ["Design"],
// };
function Detail() {
  const { productID } = useParams();
  const [item, setItem] = useState({
    productId: 0,
    productImage: "",
    productName: "",
    productPrice: 0,
    productRate: [0, 0, 0, 0, 6],
    productSalePrice: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductApi.get(productID);
        console.log(res);
        setItem(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="">
      <Header />
      <div>
        <Component1 Component1={item} />
      </div>
      <div>
        <Component2 Component2={item} />
      </div>
      <Footer />
    </div>
  );
}
export default Detail;

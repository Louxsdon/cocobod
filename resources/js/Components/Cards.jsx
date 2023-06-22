import { MdLocationOn, MdRefresh, MdFavorite, MdStar, MdShoppingCart } from "react-icons/md";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Rating from "react-rating";
import { CgShapeCircle } from "react-icons/cg";

export default function ProductCard({ name, image, category, location }) {
  return (
    <>
      <div className="card hover:shadow-lg cursor-pointer relative">
        <div className="relative overflow-hidden w-full card-header h-32 bg-white">
          <img className="w-auto m-auto object-fit h-full" src={image} alt="" />
          {/* <h3 className="w-9/12 text-center absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 font-extrabold font-serif uppercase text-2xl text-gray-300">
            Item Image
          </h3> */}
        </div>
        <div className="card-body space-y-2 text-sm mb-8">
          <div className="flex flex-col sm:flex-row justify-between text-gray-400">
            {/* Item Ratings */}
            <div className="flex items-center">
            <Rating initialRating={4.5} fractions={2} emptySymbol={<MdStar/>} fullSymbol={<MdStar className="text-yellow-500"/>} />

            </div>
            <div className="relative flex justify-between items-center sm:block">
              <s  className="sm:absolute -top-3 text-gray-400 text-xs">GH&#x20B5;700</s>
              <h4 className="text-gray-500 font-bold">GH&#x20B5;{location}</h4>
            </div>
          </div>
          <h4 className="">{name}</h4>
          <div className="flex items-center justify-between text-gray-400 absolute bottom-2">
            {/* <button className="btn primary-alt px-2">Call for price</button> */}
            <button className="btn flex items-center bg-yellow-100 borde border-yellow-400 text-yellow-500 py-2 px-2 space-x-1">
              <span>Add to Cart </span> <MdShoppingCart />
            </button>
              <button className="btn p-1"><MdFavorite className="text-gray-200 text-xl block"/></button>
          </div>
        </div>
      </div>
    </>
  );
}

export function TeamCard({ avatar, name, post }) {
  return (
    <div className="card py-10 px-5 shadow-md space-y-6 text-center rounded border-b-4 border-indigo-500 transform hover:scale-110 transition ease-in duration-500">
      <div className="img w-24 m-auto rounded-full overflow-hidden border-white border-4 shadow-md">
        <img src={avatar} alt="" />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-400 uppercase">{post}</p>
        <div className="mt-5 flex space-x-6 items-center justify-center text-gray-400">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedin />
        </div>
      </div>
    </div>
  );
}

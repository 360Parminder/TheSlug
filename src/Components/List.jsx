import moment from "moment";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { IoIosCopy } from "react-icons/io";
import PopupCard from "./PopupCard";

const List = ({ allLinks }) => {
  const [codePage, setCodePage] = useState(false);

  const linkRef = useRef(null);
  const copyToClipboard = () => {
    if (linkRef.current) {
      navigator.clipboard.writeText(linkRef.current.getAttribute("href"));
      alert("Copied to clipboard!");
    }
  };
  const showQrCode = () => {
    if (codePage == false) {
      setCodePage(true);
    } else {
      setCodePage(false);
    }
  };

  return (
    <>
      {codePage === true ? <PopupCard /> : null}
      <div className=" w-full mx-5 sm:w-9/12 flex flex-col  mt-10 rounded-t">
        {/* <div className="flex w-full justify-between text-center text-2xl text-[#C9CED6] capitalize p-2 bg-[#181E29] rounded-t">
          <p className=" w-full md:w-4/12 me-3 overflow-hidden items-center justify-center">short link</p>
          <p className="w-3/12 ms-1 overflow-hidden hidden md:flex items-center justify-center">original link</p>
          <p className="w-2/12 hidden md:flex items-center justify-center">QR code</p>
          <p className="w-2/12 hidden md:flex items-center justify-center">Clicks</p>
          <p className="w-2/12 hidden md:flex items-center justify-center">Status</p>
          <p className="w-2/12 hidden md:flex items-center justify-center">Date</p>
        </div> */}
       
        <div
          className="h-full flex gap-1 flex-col bg-transparent mt-1 overflow-y-hidden overflow-x-visible"
          style={{
            scrollbarWidth: "none",
            scrollbarColor: "none none",
          }}
        >
             <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0 + 1 }}
                  className="flex w-full justify-center md:justify-between text-center text-base font-normal text-[#C9CED6] p-2 bg-[rgba(24, 30, 41, 0.80)] backdrop-blur-2xl shadow-xl hover:border-solid"
                >
                  <div className="w-full md:w-4/12 flex flex-row items-center justify-center me-3">
                    <a
                      ref={linkRef}
                      href=""
                      target="_blank"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      className=" ms-1"
                    >
                      https://theslug.netlify.app/
                    </a>
                    <button
                      onClick={copyToClipboard}
                      className="ms-2  bg-[rgba(28, 40, 63, 0.69)] p-1 rounded-full "
                    >
                      <IoIosCopy size={20} color="" />
                    </button>
                  </div>
                  <div className="w-2/12 hidden md:flex flex-row items-center">
                    <img
                      className="w-10 h-10 rounded-md"
                      src="./fevicon.svg"
                      alt="logo"
                    />
                    <p
                      target="_blank"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      className=" ms-1 "
                    >
                      https://theslug.netlify.app/
                    </p>
                  </div>
                  <div className="w-2/12 hidden md:flex items-center justify-center">
                    <img
                      onClick={() => {
                        showQrCode();
                      }}
                      className=" ms-2 w-10 h-10 rounded cursor-pointer"
                      src="./image/qrcode.png"
                      // src={
                      //   "https://theslugproject.onrender.com/public/assets/url_qrs/" +
                      //   value.url_qr
                      // }
                      alt="Qr code"
                    />
                  </div>
                  <p className="w-2/12 hidden md:flex items-center justify-center">
                    {1}
                  </p>
                  <p className="w-2/12 hidden md:flex items-center justify-center">
                    Active
                  </p>
                  <p className="w-2/12 hidden md:flex items-center justify-center">
                    {"02-04-2024"}
                  </p>
                </motion.div>
          {allLinks
            ?.slice()
            ?.reverse()
            ?.map((value, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: index + 1 }}
                  key={index}
                  className="flex w-full justify-center md:justify-between text-center text-base font-normal text-[#C9CED6] p-2 bg-[rgba(24, 30, 41, 0.80)] backdrop-blur-2xl shadow-xl hover:border-solid"
                >
                  <div className="w-full md:w-4/12 flex flex-row items-center justify-center me-3">
                    <a
                      ref={linkRef}
                      href={
                        "https://theslugproject.onrender.com/" + value.shortURL
                      }
                      target="_blank"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      className=" ms-1"
                    >
                      {"https://theslug/" + value.shortURL}
                    </a>
                    <button
                      onClick={copyToClipboard}
                      className="ms-2  bg-[rgba(28, 40, 63, 0.69)] p-1 rounded-full "
                    >
                      <IoIosCopy size={20} color="" />
                    </button>
                  </div>
                  <div className="w-2/12 hidden md:flex flex-row items-center">
                    <img
                      className="w-10 h-10 rounded-md"
                      src={
                        "https://theslugproject.onrender.com/public/assets/url_logos/" +
                        value.url_logo
                      }
                      alt="logo"
                    />
                    <p
                      target="_blank"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      className=" ms-1 "
                    >
                      {value.redirectURL}
                    </p>
                  </div>
                  <div className="w-2/12 hidden md:flex items-center justify-center">
                    <img
                      onClick={() => {
                        showQrCode();
                      }}
                      className=" ms-2 w-10 h-10 rounded cursor-pointer"
                      src="./image/qrcode.png"
                      // src={
                      //   "https://theslugproject.onrender.com/public/assets/url_qrs/" +
                      //   value.url_qr
                      // }
                      alt="Qr code"
                    />
                  </div>
                  <p className="w-2/12 hidden md:flex items-center justify-center">
                    {value.clicks}
                  </p>
                  <p className="w-2/12 hidden md:flex items-center justify-center">
                    Active
                  </p>
                  <p className="w-2/12 hidden md:flex items-center justify-center">
                    {moment(value.createdAt).utc().format("DD-MM-YYYY")}
                  </p>
                </motion.div>
              );
            })}
        </div>
        {
          // show?<Message userstate={isLoggedIn}  />:null
        }
      </div>
    </>
  );
};
export default List;

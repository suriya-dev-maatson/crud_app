import React from "react";
import Logo from "../assets/Logo.png";
import Banner from "../assets/Banner.jpg";

const Header: React.FC = () => {
  return (
    <>
        <div className="container mx-auto px-4 fixed left-0 right-0 top-5 z-10 h-20 ">
          <div className="flex justify-center gap-4 px-6 items-center h-full bg-white bg-opacity-95 rounded-md shadow-primary">
            <div className="flex justify-center items-center bg-slate-900 p-1 rounded-full w-[32px] md:w-fit ">
              <img src={Logo} alt="Logo" className="h-6 md:w-auto md:h-12" />
            </div>
            <div className="">
              <span className="text-2xl md:text-5xl  font-bold text-BLACK">
                CRUD{" "}
              </span>
              <span className="text-2xl md:text-5xl  font-bold text-yellow-400">
                APPLICATION
              </span>
            </div>
          </div>
        </div>

      <div className=" relative h-fit">
        <div className="fluid">
          <img src={Banner} alt="Banner" className="w-full h-64" />
        </div>

        <div className="container mx-auto flex text-center items-center justify-center  text-white absolute top-32  left-0 right-0  px-2  ">
          <h1 className="text-2xl md:text-4xl max-w-[550px] md:max-w-[700px]">
            "Effortless Data Management - Your{" "}
            <span className="text-yellow-400 font-bold"> MERN </span> Stack
            <span className="font-bold"> CRUD </span> Solution"
          </h1>
        </div>
      </div>
    </>
  );
};

export default Header;

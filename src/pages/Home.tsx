import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Header from "../components/Header";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selection, setSelection] = useState<string | null>(null);

  const handleCreateClick = () => {
    navigate("createuser");
  };
  const handleReadClick = () => {
    setSelection("read");
    console.log("selection:", selection);
    navigate("listuser", { state: { action: "read" } });
  };
  const handleUpdateClick = () => {
    setSelection("update");
    console.log("selection:", selection);

    navigate("listuser", { state: { action: "update" } });
  };
  const handleDeleteClick = () => {
    setSelection("delete");
    console.log("selection:", selection);
    navigate("listuser", { state: { action: "delete" } });
  };


  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-col items-center justify-center text-center gap-6 mt-5">
        {/* Banners */}
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-3xl text-neutral-800 px-4 ">
            Welcome to the CRUD Application!
          </h1>
          <p className="text-lg px-4">
            Efficiently manage your data with our user-friendly interface built
            on the powerful MERN stack.
          </p>
        </div>
        {/* Banners End */}

        {/* Features */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold text-fuchsia-950 roboto">
              Features of this Application
            </h1>
            <p className="text-sm font-semibold text-gray-800">
              (Select an option to Proceed)
            </p>
          </div>     
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1200px] mx-4">
            {/* C */}
            <div className="flex flex-col gap-2 items-center justify-center  p-2 ">
              <div className="crud" onClick={handleCreateClick}>
                <span className="absolute top-6 left-9">C</span>
              </div>
              <h1 className="text-3xl crud-text" onClick={handleCreateClick}>
                Create
              </h1>
              <p className="text-neutral-800">
                Adding a new user allows you to expand the database by
                registering individuals or entities into the system.
              </p>
            </div>
            {/* R */}
            <div className="flex flex-col gap-2 items-center justify-center p-2">
              <div className="crud" onClick={handleReadClick}>
                <span className="absolute top-5 left-9">R</span>
              </div>
              <h1 className="text-3xl crud-text" onClick={handleReadClick}>
                Read
              </h1>
              <p className="text-neutral-800 ">
                Viewing all users allows you to access the database and display
                a comprehensive list of registered individuals or entities.
              </p>
            </div>
            {/* U */}
            <div className="flex flex-col gap-2 items-center justify-center  p-2">
              <div className="crud" onClick={handleUpdateClick}>
                <span className="absolute top-6 left-8">U</span>
              </div>
              <h1 className="text-3xl crud-text" onClick={handleUpdateClick}>
                Update
              </h1>
              <p className="text-neutral-800">
                Updating a user involves selecting an individual or entity from
                the list page and modifying their details in the system.
              </p>
            </div>
            {/* D */}
            <div className="flex flex-col gap-2 items-center justify-center p-2 ">
              <div className="crud" onClick={handleDeleteClick}>
                <span className="absolute top-[22px] left-[37px]">D</span>
              </div>
              <h1 className="text-3xl crud-text" onClick={handleDeleteClick}>
                Delete
              </h1>
              <p className="text-neutral-800">
                Deleting a user allows you to manage the database by navigating
                to the list page and selecting the user you want to remove.
              </p>
            </div>
            {/* C R U D End */}
          </div>
        </div>
        {/* Features End */}
      </div> 

      {/* Footer */}
      <div className="flex flex-col shadow-primary mt-10  h-10 items-center justify-center text-center">
        <p className=" text-sm"> 2024 CRUD Application. All Rights Reserved.</p>
      </div>

    </>
  );
};

export default Home;

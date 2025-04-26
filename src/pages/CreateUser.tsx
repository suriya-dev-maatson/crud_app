import React from "react";
import Header from "../components/Header";
import CreateForm from "../components/CreateForm";
import GroupField from "../components/GroupField";
import TicMark from "../assets/TicMark.png";
import CreateUserImage from "../assets/CreateUser2.avif";
import FormImage from "../assets/CreateUser2-bg.png";

const CreateUser: React.FC = () => {

  return (
    <>
      <Header />

      <div className=" bg-gradient-to-b from-black via-slate-900 to-purple-950 py-5 ">
        {/* Hero  */}
        <div className="container mx-auto px-2 flex flex-col gap-4 my-4 text-white justify-center items-center text-center ">
          <div className="flex gap-1">
            <h1 className="text-4xl lg:text-5xl">Creating a New User </h1>
            <img
              src={TicMark}
              alt="TicMark"
              className="h-9 lg:h-12 mt-1 lg:mt-0"
            />
          </div>
          <p className="text-base lg:text-lg">
            Adding a new user allows you to expand the database by registering
            individuals or entities into the system.
          </p>
        </div>
        {/* Hero End */}
        <div className="container mx-auto flex flex-col text-white px-4 justify-center items-center h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 py-10 gap-10 justify-center items-center max-w-[1000px] h-full">
            {/* 1 */}
            <div className="flex flex-col gap-2 list-cards">
              <p className="list-heading">User Management</p>
              <ul className="list-ul flex flex-col gap-1 ">
                <li>
                  Maintain a structured record of individuals or entities
                  interacting with the system.
                </li>
                <li>
                  Simplify the management of permissions, roles, and access
                  levels.
                </li>
              </ul>
            </div>
            {/* 2 */}
            <div className="flex flex-col gap-2 list-cards">
              <p className="list-heading">Enhanced Functionality</p>
              <ul className="list-ul flex flex-col gap-1 ">
                <li>
                  Support the creation of personalized dashboards or
                  user-specific views.
                </li>
                <li>
                  Enable user-based tracking for activities, logs, or
                  preferences.
                </li>
              </ul>
            </div>
            {/* 3 */}
            <div className="flex flex-col gap-2 list-cards">
              <p className="list-heading">Scalability</p>
              <ul className="list-ul flex flex-col gap-1 ">
                <li>
                  Facilitate the seamless onboarding of new users as the system
                  grows.
                </li>
                <li>
                  Allow for the addition of diverse user types (e.g., admins,
                  contributors, or guests).
                </li>
              </ul>
            </div>
            {/* 4 */}
            <div className="flex flex-col gap-2 list-cards">
              <p className="list-heading">Data Segmentation</p>
              <ul className="list-ul flex flex-col gap-1 ">
                <li>
                  Segregate data based on user-specific criteria for better
                  organization.
                </li>
                <li>
                  Provide tailored data and features to each user according to
                  their role or permissions.
                </li>
              </ul>
            </div>
            {/* 4 End */}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 h-full my-10 bg-white px-16 py-10 ">
        <img
          src={CreateUserImage}
          alt="CreateUserImage"
          className="h-full rounded-lg"
        />
        {/* Form */}
        <form
          style={{
            backgroundImage: `url(${FormImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex flex-col gap-4 border-2 rounded-md px-6 py-4 text-white "
        >
          <div className="flex flex-col gap-6">
            <GroupField
              label="User Name"
              id="username"
              name="username"
              type="text"
              placeholder="Enter User Name"
            />
            <GroupField
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Enter User Email"
            />
            <GroupField
              label="Gender"
              id="gender"
              name="gender"
              type="radio"
              options={[
              ]}
            />
            <GroupField
              label="Date of Birth"
              id="dob"
              name="dob"
              type="date"
              placeholder=""
            />
            <GroupField
              label="Upload Your Photo"
              id="photo"
              name="photo"
              type="file"
            />
          </div>

          <div className=" flex items-center justify-center h-full">
            <button type="submit" className="btn my-5 ">
              Submit
            </button>
          </div>
        </form>
      </div>

      <CreateForm />
    </>
  );
};
export default CreateUser;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";

const ViewUser: React.FC = () => {
  const [data, setData] = useState<{
    [key: string]: string;
  }>({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    address: "",
    state: "",
    country: "",
    countryPort: "",
    projectTitle: "",
    projectDescription1: "",
    projectDescription2: "",
    projectDescription3: "",
    internshipTitle: "",
    internshipDescription1: "",
    internshipDescription2: "",
    internshipDescription3: "",
  });
  const [image, setImage] = useState<string | null>(null);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/user/${id}`)
        .then((response) => {
          const userData = response.data;
          setData(userData);
          setImage(`http:localhost:5000/${userData.photo}`);
        })
        .catch((error) => console.error("Error fetching user data", error));
    }
  }, [id]);

  const [project, setProject] = useState(true);
  const [internship, setInternship] = useState(false);

  const handleProject = () => {
    setProject(true);
    setInternship(false);
  };
  const handleInternship = () => {
    setProject(false);
    setInternship(true);
  };

  const handleDownload = async () => {
    try {
      // Make the request to the backend
      const response = await axios.get(`http://localhost:5000/user/userid/${id}/download`, {
        responseType: "arraybuffer",
      });
      console.log("Response : ", response);
      console.log("Response. Data : ", response.data);

      // Convert the response to a blob and create a download link
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${data.firstname}-${data.lastname}-Resume.pdf`;
      link.click();
      link.remove();
      console.log("PDF Downloaded successfully!");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <>
      <Header />

      <div className="container mx-auto h-full flex flex-col gap-6 mt-16 mb-10 justify-center items-center ">
        {/*  */}
        <div className="flex flex-col lg:flex-row  border-t-8 border-t-purple-950 w-full max-w-[1200px] ">
          <div className="hidden lg:flex flex-col bg-gray-200 border-r-2 w-full max-w-[300px]">
            <div className="flex justify-center items-center py-10">
              <p className="text-2xl font-semibold ">User Profile</p>
            </div>
            {/*  */}
            <div className="flex flex-col justify-center items-center gap-8">
              {/* 1 */}
              <div className="flex gap-3 w-full py-2 justify-start pl-20 items-center border-r-4 border-r-purple-950">
                <div className="w-6 h-6 ">
                  <FaUserCircle className="h-full w-full text-purple-950" />
                </div>
                <p className="text-lg font-semibold text-purple-950">
                  User Info
                </p>
              </div>
              {/* 2 */}
              <div className="flex gap-3  w-full py-2 justify-start pl-20 items-center">
                <div className="w-6 h-6 ">
                  <MdOutlineFavorite className="h-full w-full" />
                </div>
                <p className="text-lg font-semibold">Favorites</p>
              </div>
              {/* 3 */}
              <div className="flex gap-3  w-full py-2 justify-start pl-20 items-center">
                <div className="w-6 h-6 ">
                  <IoStar className="h-full w-full" />
                </div>
                <p className="text-lg font-semibold">Watchlist</p>
              </div>
              {/* 4 */}
              <div className="flex gap-3  w-full py-2 justify-start pl-20 items-center">
                <div className="w-6 h-6 ">
                  <IoSettingsSharp className="h-full w-full" />
                </div>
                <p className="text-lg font-semibold">Settings</p>
              </div>
              {/* 5 */}
              <div className="flex gap-3  w-full py-2 justify-start pl-20 items-center">
                <div className="w-6 h-6 ">
                  <IoNotifications className="h-full w-full" />
                </div>
                <p className="text-lg font-semibold">Notification</p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="w-full flex-col gap-4  pt-10 justify-center items-center px-10 md:px-10 lg:px-14">
            {/* top div */}
            <div className="flex">
              {/* photoside */}
              <div className="flex flex-col gap-4 items-center border-r-2 border-r-zinc-300 pr-6 md:pr-0  w-full max-w-[230px] md:max-w-[300px] ">
                <div className="w-40 h-40 bg-purple-300 rounded-full">
                  {image && (
                    <img
                      src={`http://localhost:5000/${data.photo}`}
                      alt="Profile"
                      className="w-full h-full rounded-full p-1"
                    />
                  )}
                </div>
                <div className="text-4xl font-semibold text-purple-950 text-opacity-80 ">
                  {data.firstname} {data.lastname}
                </div>
              </div>
              {/* photoside end */}

              {/* contentside */}
              <div className=" flex flex-col gap-8  pl-16 lg:pl-14 pr-5 w-full">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center w-full ">
                    <div className="font-semibold text-lg max-w-[90px]  w-full">
                      Email
                    </div>
                    <div className="text-neutral-700">{data.email}</div>
                  </div>
                  <div className="flex items-center w-full ">
                    <div className="font-semibold text-lg max-w-[90px] w-full">
                      Contact
                    </div>
                    <div className="text-neutral-700">{data.contact}</div>
                  </div>
                </div>
                {/* 2nd division */}
                <div className="border-t-2  border-t-zinc-300 "></div>
                {/* 3rd division */}
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex gap-8 justify-between">
                    <div className="flex flex-col gap-2  w-full">
                      <div className="font-semibold text-lg">Date of Birth</div>
                      <div className="text-neutral-700">{data.dob}</div>
                    </div>
                    <div className="flex flex-col gap-2  w-full">
                      <div className="font-semibold text-lg">Gender</div>
                      <div className="text-neutral-700">{data.gender}</div>
                    </div>
                    <div className="flex flex-col gap-2  w-full">
                      <div className="font-semibold text-lg">Address</div>
                      <div className="text-neutral-700">{data.address}</div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex gap-8 justify-between">
                    <div className="flex flex-col gap-2  w-full">
                      <div className="font-semibold text-lg">State</div>
                      <div className="text-neutral-700">{data.state}</div>
                    </div>
                    <div className="flex flex-col gap-2  w-full">
                      <div className="font-semibold text-lg ">Country</div>
                      <div className="text-neutral-700">{data.country}</div>
                    </div>
                    <div className="flex flex-col gap-2  w-full">
                      <div className="font-semibold text-lg ">Country/Port</div>
                      <div className="text-neutral-700">{data.countryPort}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* top div end */}

            <div className="flex flex-col justify-center items-center mt-10 w-full">
              <div className="flex justify-center items-center w-full border-2">
                <div
                  className={`flex justify-center items-center  h-10 w-full cursor-pointer border-r-2 border-r-gray-500 ${
                    project
                      ? "bg-gray-200 font-medium text-purple-950"
                      : "bg-transparent"
                  } `}
                  onClick={handleProject}
                >
                  Projects
                </div>
                <div
                  className={`flex justify-center items-center h-10 w-full cursor-pointer ${
                    internship
                      ? "bg-gray-200 font-medium text-purple-950"
                      : "bg-transparent"
                  } `}
                  onClick={handleInternship}
                >
                  Internships
                </div>
              </div>

              <div className="border-x-2 border-b-2 pb-2">
                <div className="w-full h-full min-h-[250px] max-h-[250px]  relative  overflow-y-auto mt-5 px-5">
                  {/* Projects */}
                  {project && (
                    <div className="flex flex-col gap-6">
                      {/* Project 1 */}
                      <div className="flex flex-col gap-4">
                        <p className="text-xl font-semibold">
                          {data.projectTitle}
                        </p>
                        <ul className="text-sm list-disc ml-4 flex flex-col gap-2 text-neutral-600 font-medium">
                          <li>{data.projectDescription1}</li>
                          <li>{data.projectDescription2}</li>
                          <li>{data.projectDescription3}</li>
                        </ul>
                      </div>

                      {/* Project 2 */}
                      {/* <div className="flex flex-col gap-4">
                        <p className="text-xl font-semibold">
                          Project Title -2
                        </p>
                        <ul className="text-sm list-disc ml-4 flex flex-col gap-2 text-neutral-600 font-medium">
                          <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat dolor, voluptates ut magni error
                            necessitatibus temporibus, et, dicta ullam nemo quam
                            consequuntur aliquid. Voluptates consequatur nobis
                            quae! Delectus, mollitia!
                          </li>
                          <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat dolor, voluptates ut magni error
                            necessitatibus temporibus, et, dicta ullam nemo quam
                            consequuntur aliquid. Voluptates consequatur nobis
                            quae! Delectus, mollitia!
                          </li>
                          <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat dolor, voluptates ut magni error
                            necessitatibus temporibus, et, dicta ullam nemo quam
                            consequuntur aliquid. Voluptates consequatur nobis
                            quae! Delectus, mollitia!
                          </li>
                        </ul>
                      </div> */}
                    </div>
                  )}

                  {/* Internships */}
                  {internship && (
                    <div className="flex flex-col gap-6">
                      {/* Internship 1 */}
                      <div className="flex flex-col gap-4">
                        <p className="text-xl font-semibold">
                          {data.internshipTitle}
                        </p>
                        <ul className="text-sm list-disc ml-4 flex flex-col gap-2 text-neutral-600 font-medium">
                          <li>{data.internshipDescription1}</li>
                          <li>{data.internshipDescription1}</li>
                          <li>{data.internshipDescription1}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {/* Internship end */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 py-10">
          <button
            className="h-10 px-6 text-white font-semibold rounded-full bg-gradient-to-b from-purple-500 to-purple-950"
            onClick={handleDownload}
          >
            Download as Resume
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewUser;

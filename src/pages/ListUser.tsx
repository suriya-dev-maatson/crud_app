import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Oops from "../assets/Oops.png";

const ListUser: React.FC = () => {
  const [userdata, setUserData] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { action } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user");
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching users: ", err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirm) return;

      await axios.delete(`http://localhost:5000/user/delete/${id}`);
      setUserData((prev) => prev.filter((user) => user._id !== id));
      alert("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user: ", err);
      alert("Failed to delete user");
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/update/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/viewuser/${id}`);
  };

  const handleDownloadAllPDF = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/downloadAllPdf`,
        {
          responseType: "arraybuffer",
        }
      );

      // Convert the response to a blob and create a download link
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "All Resumes";
      link.click();
      link.remove();
      console.log("All PDF Downloaded successfully!");
    } catch (err) {
      console.log("Error downloading All PDF: ", err);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-2 justify-center items-center">
        {/* No users  */}
        {userdata.length === 0 && (
          <div className="flex flex-col justify-center items-center h-[400px] text-center ">
            <img src={Oops} alt="Oops" className="w-64" />
            <h1 className="text-4xl font-semibold italic text-stone-700">
              No Users Found in the List!
            </h1>
          </div>
        )}

        {/* Show the lists when length greater than 0 */}
        {userdata.length > 0 && (
          <div className="mt-5">
            {action === "read" && (
              <div className="container mx-auto flex justify-center items-center pt-5 text-2xl md:text-4xl text-shadow font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                The Registered Users are listed below!
              </div>
            )}
            {action === "update" && (
              <div className="container mx-auto flex justify-center items-center pt-5 text-2xl md:text-4xl text-shadow font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Select Which User Details you want to Update!
              </div>
            )}
            {action === "delete" && (
              <div className="container mx-auto flex justify-center items-center pt-5 text-2xl md:text-4xl text-shadow font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Select Which User Details you want to Delete!
              </div>
            )}

            {/* Show Lists */}
            <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 sm:gap-x-10 lg:gap-x-10 xl:gap-x-10 gap-y-10 sm:gap-y-10 md:gap-y-20 lg:gap-y-10 xl:gap-y-20 justify-center items-center ">
              {userdata.map((item, index) => (
                <div className=" flex justify-center items-center" key={index}>
                  <div className="flex flex-col items-center shadow-card-outer rounded w-full max-w-[300px] p-6 ">
                    <div className="h-full w-full rounded-t-lg rounded-b shadow-card">
                      {/* photo part */}
                      <div className="h-20 bg-gradient-to-r from-purple-900 via-purple-600 to-purple-900 w-full relative rounded-t-lg">
                        <div className="absolute top-8 flex justify-center items-center w-full">
                          <div className="h-20 w-20 rounded-full bg-white p-1">
                            <div className="bg-purple-700 h-full w-full rounded-full">
                              <img
                                src={`http://localhost:5000/${item.photo}`}
                                alt="Profile"
                                className="w-full h-full rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* details part */}
                      <div className="flex flex-col w-full items-center h-full gap-6 ">
                        <div className="h-2  w-full"></div>
                        <div className="flex flex-col gap-1 items-center justify-center w-full">
                          <h1 className="text-sm font-semibold text-purple-900 ">
                            {item.firstname} {item.lastname}
                          </h1>
                          <h1 className="text-sm font-semibold text-neutral-600">
                            {item.email}
                          </h1>
                        </div>
                        <div className="flex gap-4 w-full px-4">
                          <button
                            className=" text-sm font-semibold  border-2 border-purple-700 h-8 w-full rounded-2xl text-purple-800"
                            onClick={() => handleUpdate(item._id)}
                          >
                            Update
                          </button>
                          <button
                            className=" text-sm font-semibold border-2 border-purple-700 h-8 w-full rounded-2xl text-purple-800"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                        <div className="w-full px-4 mb-4">
                          <button
                            className="w-full h-10 bg-gradient-to-b from-purple-500 to-purple-900 text-white font-semibold rounded-full"
                            onClick={() => handleView(item._id)}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-[800px] flex items-center justify-center">
              <button
                onClick={handleDownloadAllPDF}
                className="h-10 px-6 text-white font-semibold rounded-full bg-gradient-to-b from-purple-500 to-purple-950"
              >
                Download All as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ListUser;

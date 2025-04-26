import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreatForm: React.FC = () => {
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagePreviewFile, setImagePreviewFile] = useState<File | null>(null);
  const [countryPortData, setCountryPortData] = useState<
    { country: string; port: string }[]
  >([]);
  const [filteredCountryPort, setFilteredCountryPort] = useState<
    { country: string; port: string }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();
  const { id } = useParams(); // Get the id

  // Fetch user data when updating
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/user/${id}`)
        .then((response) => {
          const userData = response.data;
          setData(userData);
          setImagePreview(`http://localhost:5000/${userData.photo}`);
          setInputValue(userData.countryPort);
        })
        .catch((error) => console.error("Error fetching user data", error));
    }
  }, [id]);

  // Fetch country/port data
  useEffect(() => {
    const fetchCountryPortData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/country-port"
        );
        setCountryPortData(response.data);
        // console.log("Fetching country/port data:", response.data);
      } catch (err) {
        console.error("Error fetching country/port data:", err);
      }
    };
    fetchCountryPortData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name as keyof typeof data]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreviewFile(file); //Save the file object
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); //Show image preview (Set it as URL)
      };  
      reader.readAsDataURL(file);
    }
  };

  const handleCountryPortInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setInputValue(value);
    setData((prev) => ({ ...prev, countryPort: value }));

    if (value.trim() === "") {
      setFilteredCountryPort([]);
      return;
    }
    const filtered = countryPortData.filter(
      (item) =>
        item.country.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
        item.port.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setFilteredCountryPort(filtered);
  };

  const handleCountryPortSelect = (selection: string) => {
    setInputValue(selection);
    setData((prev) => ({ ...prev, countryPort: selection }));
    setFilteredCountryPort([]);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key])); //Append all the datas in data to formData
    if (imagePreviewFile) {
      formData.append("photo", imagePreviewFile); // Append the image file
    }

    try {
      if (id) {
        const response = await axios.put(
          `http://localhost:5000/user/update/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Response:", response.data);
        alert("User updated successfully!");
      } else {
        const response = await axios.post(
          `http://localhost:5000/user`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Response:", response.data);
        alert("Form submitted successfully!");
      }
      setData({
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
      setImagePreview(null); // Clear image preview after submission
      navigate("/listuser");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <>
      <div className="container mx-auto my-5 p-5 ">
        <form
          className=" flex flex-col gap-12 bg-gradient-to-r from-purple-950   via-violet-950  to-purple-950  px-5 py-10 "
          onSubmit={handleFormSubmit}
        >
          {/* first part */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center ">
            {/* photo div */}
            <div className="relative flex items-center justify-center h-40 w-40 bg-purple-300 rounded-full border-2  border-gray-400 hover:bg-purple-400 cursor-pointer">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Uploaded Image"
                  className="h-full w-full object-cover rounded-full p-1"
                />
              ) : (
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-800">↑</div>
                  <p className="text-base font-medium text-gray-800">
                    Upload Photo
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                name="photo"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            {/* inputs side*/}
            <div className="flex flex-col justify-between items-center gap-8 w-[100%] lg:w-[80%] ">
              {/* 1st row */}
              <div className="flex flex-col items-center justify-center md:flex-row gap-12 w-full">
                {/* first name */}
                <div className="relative w-full max-w-[400px]">
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder=""
                    value={data.firstname}
                    onChange={handleInputChange}
                    className="peer w-full block border-b-2  bg-transparent  pt-5 pb-2 text-white  focus:outline-none focus:border-white"
                  />
                  <label
                    htmlFor="firstname"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.firstname !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    First Name
                  </label>
                </div>
                {/* last name */}
                <div className="relative w-full max-w-[400px]">
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder=""
                    value={data.lastname}
                    onChange={handleInputChange}
                    className="peer w-full block border-b-2 bg-transparent  pt-5 pb-2 text-white  focus:outline-none focus:border-white"
                  />
                  <label
                    htmlFor="lastname"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.lastname !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    Last Name
                  </label>
                </div>
                {/* email */}
                <div className="relative w-full max-w-[400px]">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=""
                    value={data.email}
                    onChange={handleInputChange}
                    className="peer w-full block border-b-2  bg-transparent  pt-5 pb-2  text-white  focus:outline-none focus:border-white"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.email !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    Email Address
                  </label>
                </div>
              </div>

              {/* 2nd row */}
              <div className="flex flex-col items-center justify-center md:flex-row gap-12 w-full">
                {/* Contact */}
                <div className="relative w-full max-w-[400px]">
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={data.contact}
                    onChange={handleInputChange}
                    placeholder=""
                    className="peer w-full block border-b-2  bg-transparent  pt-5 pb-2 text-white  focus:outline-none focus:border-white"
                  />
                  <label
                    htmlFor="contact"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.contact !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    Contact Number
                  </label>
                </div>
                {/* Gender Dropdown */}
                <div className="relative w-full max-w-[400px]">
                  <select
                    id="gender"
                    name="gender"
                    value={data.gender}
                    onChange={handleInputChange}
                    className={`peer w-full block appearance-none border-b-2 bg-transparent pt-5 pb-2 text-white focus:outline-none focus:border-white`}
                  >
                    <option value="" hidden></option>
                    <option value="Male" className="text-black">
                      Male
                    </option>
                    <option value="Female" className="text-black">
                      Female
                    </option>
                  </select>
                  <label
                    htmlFor="gender"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.gender !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    Gender
                  </label>
                </div>
                {/* Date of Birth */}
                <div className="relative w-full max-w-[400px]">
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    placeholder=""
                    value={data.dob}
                    onChange={handleInputChange}
                    className="peer w-full block border-b-2 bg-transparent pt-5 pb-2 text-white focus:outline-none focus:border-white"
                  />
                  <label
                    htmlFor="dob"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.dob !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    Date of Birth
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Second part */}
          <div className="px-0 xl:px-10  ">
            <div className="flex flex-col lg:flex-row gap-12 justify-center items-center ">
              {/* Address */}
              <div className="w-full flex flex-col gap-12 items-center  ">
                <div className="relative w-full max-w-[400px] md:max-w-full">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder=""
                    value={data.address}
                    onChange={handleInputChange}
                    className="peer w-full block border-b-2  bg-transparent  pt-5 pb-2 text-white  focus:outline-none focus:border-white"
                  />
                  <label
                    htmlFor="address"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.address !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    Address
                  </label>
                </div>
              </div>
              {/* State */}
              <div className="w-full flex flex-col gap-12 items-center ">
                <div className="relative w-full max-w-[400px] md:max-w-full">
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder=""
                    value={data.state}
                    onChange={handleInputChange}
                    className="peer w-full block border-b-2  bg-transparent  pt-5 pb-2 text-white  focus:outline-none focus:border-white"
                  />
                  <label
                    htmlFor="state"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.state !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    State
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Third part */}
          <div className="px-0 xl:px-10  ">
            <div className="flex flex-col lg:flex-row gap-12 justify-center items-center ">
              {/* Country */}
              <div className="w-full flex flex-col gap-12 items-center  ">
                <div className="relative w-full max-w-[400px] md:max-w-full">
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder=""
                    value={data.country}
                    onChange={handleInputChange}
                    className="peer w-full block border-b-2  bg-transparent  pt-5 pb-2 text-white  focus:outline-none focus:border-white"
                  />
                  <label
                    htmlFor="country"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.country !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    Country
                  </label>
                </div>
              </div>
              {/* Country/Port */}
              <div className="w-full flex flex-col gap-12 items-center ">
                <div className="relative w-full max-w-[400px] md:max-w-full">
                  <input
                    type="text"
                    id="countryPort"
                    name="countryPort"
                    placeholder=""
                    // value={data.countryPort}
                    // onChange={handleInputChange}
                    value={inputValue}
                    onChange={handleCountryPortInputChange}
                    className={`peer w-full block border-b-2 bg-transparent  pt-5 pb-2 text-white  focus:outline-none focus:border-white `}
                  />
                  {filteredCountryPort.length > 0 && (
                    <ul className="absolute top-[55px] right-0 left-0 bg-white border-2 rounded-md list-none max-h-[200px] overflow-y-auto z-10 ">
                      {filteredCountryPort.map((item, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            handleCountryPortSelect(
                              `${item.port}, ${item.country}`
                            )
                          }
                          className="p-2 cursor-pointer border-b-[1px]"
                        >
                          {item.port}, {item.country}
                        </li>
                      ))}
                    </ul>
                  )}
                  <label
                    htmlFor="countryPort"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.country !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    Country / Port
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth part */}
          <div className="px-0 xl:px-10 ">
            <div className="flex flex-col lg:flex-row gap-12 justify-center items-center ">
              {/* Project */}
              <div className="w-full flex flex-col gap-12 items-center  ">
                <div className="relative w-full max-w-[400px] md:max-w-full">
                  <input
                    type="text"
                    id="projectTitle"
                    name="projectTitle"
                    placeholder=""
                    value={data.projectTitle}
                    onChange={handleInputChange}
                    className="peer w-full block border-b-2  bg-transparent  pt-5 pb-2 text-white  focus:outline-none focus:border-white"
                  />
                  <label
                    htmlFor="country"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.projectTitle !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    Project Title -1
                  </label>
                </div>
                {/* Project Descriptions */}
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className="relative w-full max-w-[400px] md:max-w-full"
                  >
                    <input
                      type="text"
                      id={`projectDescription${num}`}
                      name={`projectDescription${num}`}
                      placeholder=""
                      value={
                        data[`projectDescription${num}` as keyof typeof data]
                      }
                      onChange={handleInputChange}
                      className="peer w-full block border-b-2 bg-transparent pt-5 pb-2 text-white focus:outline-none focus:border-white"
                    />
                    <label
                      htmlFor={`projectDescription${num}`}
                      className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data[`projectDescription${num}` as keyof typeof data] !==
                       ""
                         ? "text-xs"
                         : "text-xs"
                     }`}
                    >
                      Project Description {num}
                    </label>
                  </div>
                ))}
              </div>
              {/* Internships */}
              <div className="w-full flex flex-col gap-12 items-center ">
                <div className="relative w-full max-w-[400px] md:max-w-full">
                  <input
                    type="text"
                    id="internshipTitle"
                    name="internshipTitle"
                    placeholder=""
                    value={data.internshipTitle}
                    onChange={handleInputChange}
                    className="peer w-full block border-b-2  bg-transparent  pt-5 pb-2 text-white  focus:outline-none focus:border-white"
                  />
                  <label
                    htmlFor="internshipTitle"
                    className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data.internshipTitle !== "" ? "text-xs" : "text-xs"
                     }`}
                  >
                    Internship Title -1
                  </label>
                </div>
                {/* Internship Descriptions */}
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className="relative w-full max-w-[400px] md:max-w-full"
                  >
                    <input
                      type="text"
                      id={`internshipDescription${num}`}
                      name={`internshipDescription${num}`}
                      placeholder=""
                      value={
                        data[`internshipDescription${num}` as keyof typeof data]
                      }
                      onChange={handleInputChange}
                      className="peer w-full block border-b-2 bg-transparent pt-5 pb-2 text-white focus:outline-none focus:border-white"
                    />
                    <label
                      htmlFor={`internshipDescription${num}`}
                      className={`absolute left-0 top-0 text-sm text-gray-400 transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 ${
                       data[
                         `internshipDescription${num}` as keyof typeof data
                       ] !== ""
                         ? "text-xs"
                         : "text-xs"
                     }`}
                    >
                      Internship Description {num}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Last part */}
          <div className="px-0 xl:px-10 flex justify-center">
            <div className="w-full max-w-[400px] md:max-w-full flex justify-end">
              <button className="h-10 border-2 border-white text-lg text-white font-semibold px-10 ">
                {id ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatForm;

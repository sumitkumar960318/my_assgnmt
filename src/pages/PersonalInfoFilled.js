import { useLocation, useNavigate } from "react-router-dom";
import { AvatarProfiles } from "../Avatar_Profile";
import { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const PersonalInfoFilled = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let { isAvatarImg, profileURL, selectedAvatar } = location.state || {};
  console.log(selectedAvatar, profileURL, isAvatarImg, "kk");
  const [selectedYear, setSelectedYear] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    firstName: false,
    lastName: false,
    birthYear: false,
  });
  const uploadedPhoto = isAvatarImg? selectedAvatar : profileURL;

  const [showDropdown, setShowDropdown] = useState(false);
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;
  const years = Array.from(
    { length: 101 },
    (_, index) => startYear + index
  ).reverse();
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setShowDropdown(false);
  };
  const handleSave = () => {
    const errors = {
      firstName: firstName.trim(),
      lastName: !lastName.trim(),
      birthYear: !selectedYear,
    };

    setValidationErrors(errors);
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    console.log("Save operation");
  };

  return (
    <div className="relative font-[Abel] w-screen h-screen flex flex-col items-center ">
      <div className="top-mar gap-[8px] mt-[91px] mx-[1.25rem] flex flex-col">
        <p className=" leading-[150%] font-[Abel] text-[#020617] text-[1.25rem] font-[400] opacity-[85%]">
          Let's get to know you
        </p>
        <p className=" text-[1rem] text-[#020617] opacity-[70%] font-[Abel] leading-[170%] font-[400]">
          Let us get to know you a bit better so you can get the best out of us
        </p>
      </div>
      <div className="profile-con w-full mt-[24px] flex flex-col items-center gap-[2.50rem]">
        <div className="img-con w-[10rem] h-[10rem] relative flex justify-center mx-[1.25rem]">
          {
            !uploadedPhoto? <div className="img-con w-[10rem] h-[10rem] rounded-full bg-[#F1F5F9]"></div>:<img
            src={uploadedPhoto}
            alt="profie "
            className="img-con w-[10rem] h-[10rem] rounded-full"
          />
          }
          
          <div
            onClick={() =>
              navigate("/chooseprofilephoto", {
                state: {
                  uploadedPhoto,
                  isAvatarImg
                },
              })
            }
            className="edit-con bottom-[-14px] border-[1px] border-[#020617]  border-opacity-[12%] rounded-[20px] absolute flex py-[4px] px-[12px] items-center gap-[8px] bg-[#F8FAFC]"
          >
            <img
              className="edit-icon w-[1.25rem] h-[1.25rem] overflow-hidden shrink-0 object-cover"
              alt=""
              src="/ucamera@2x.png"
            />
            <p className="edit-icon t-[#020617] text-opacity-[85%] font-[400] text-[0.875rem] leading-[1.4875]">
              Edit
            </p>
          </div>
        </div>
        <div className="input-gap w-full flex flex-col gap-4">
          <div className="mx-[1.25rem] flex flex-col gap-1">
            <label
              htmlFor="first_name"
              className="leading-[170%] text-[#020617] text-opacity-[70%] text-[0.875rem]"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`inputs bg-[#F8FAFC] py-[11px] px-[16px] border-[1px] border-[#020617] border-opacity-[6%] rounded-[12px] focus:outline-none focus:border-blue-300 ${
                validationErrors.firstName ? "border-red-500" : ""
              }`}
            />
          </div>

          <div className="mx-[1.25rem] flex flex-col gap-1">
            <label
              htmlFor="last_name"
              className="leading-[170%] text-[#020617] text-opacity-[70%] text-[0.875rem]"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`inputs bg-[#F8FAFC] py-[11px] px-[16px] border-[1px] border-[#020617] border-opacity-[6%] rounded-[12px] focus:outline-none focus:border-blue-300 ${
                validationErrors.lastName ? "border-red-500" : ""
              }`}
            />
          </div>
          <div className=" relative mx-[1.25rem] flex flex-col gap-1">
            <label
              htmlFor="birth_year"
              className="leading-[170%] text-[#020617] text-opacity-[70%] text-[0.875rem]"
            >
              Birth Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="birth_year"
              name="birth_year"
              value={selectedYear}
              onFocus={() => setShowDropdown(true)}
              className={`inputs bg-[#F8FAFC] py-[11px] px-[16px] border-[1px] border-[#020617] border-opacity-[6%] rounded-[12px] focus:outline-none focus:border-blue-300 ${
                validationErrors.birthYear ? "border-red-500" : ""
              }`}
            />
            {showDropdown ? (
              <FaChevronUp
                onClick={() => setShowDropdown(false)}
                className="absolute right-5 top-11"
              />
            ) : (
              <FaChevronDown
                onClick={() => setShowDropdown(true)}
                className="absolute right-5 top-11"
              />
            )}
            {showDropdown && (
              <div className="h-[70px] overflow-x-hidden border-2 flex flex-col items-center ">
                {years.map((year) => (
                  <p
                    className="inputs w-full bg-[#F8FAFC] py-[8px] px-[16px] border-b-[1px] border-[#020617] border-opacity-[6%] focus:outline-none focus:border-blue-300"
                    key={year}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="bottom-btn text-[#ffffff] leading-[170%] absolute bottom-10 bg-[#1898A0] px-[16px] py-[11px] w-[90%] rounded-[12px] "
      >
        Save
      </button>
    </div>
  );
};

export default PersonalInfoFilled;

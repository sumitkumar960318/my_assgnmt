import { AvatarProfiles } from "../Avatar_Profile";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineCameraAlt } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../style.css";
const ChooseProfilePhoto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let { uploadedPhoto, isAvatarImg } = location.state || {};

  const [isAvatarTab, setIsAvatarTab] = useState(isAvatarImg && uploadedPhoto ? true: false);
  const [profileURL, setProfileURL] = useState(uploadedPhoto || "");
  const [selectedAvatar, setSelectedAvatar] = useState(uploadedPhoto || "");
  const [openUploadProfile, setOpenUploadProfile] = useState(false);
  const [uploadPhotoPopUp, setUploadPhotoPopUp] = useState(false);

  console.log( {profileURL, isAvatarImg});

  const handleToggle = () => {
    setIsAvatarTab((pre) => !pre);
  };

  const handleAvatarClick = (path) => {
    setSelectedAvatar(path);
  };

  const handleSave = () => {
    if (AvatarProfiles || profileURL) {
      navigate("/personalinfo", {
        state: {
          selectedAvatar,
          profileURL,
          isAvatarImg:  isAvatarTab ,
        },
      });
    }
  };

  const handlePhotoUpload = (file) => {
    console.log(file);
    const photoURL = URL.createObjectURL(file);
    setProfileURL(photoURL);
    setUploadPhotoPopUp(false);
    setOpenUploadProfile(true);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setUploadPhotoPopUp(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      localStorage.removeItem("uploadedPhoto");
    };
  }, []);

  const handleDeletePhoto = () => {
    setProfileURL("");
    setIsAvatarTab(false);
    setSelectedAvatar('')
    setUploadPhotoPopUp(false);
  };

  return (
    <div className="relative flex flex-col items-center font-[Abel] w-screen h-screen ">
      <IoCloseOutline
        onClick={() => handleSave()}
        className=" close-icon absolute left-[20px] top-[18px] text-[44px] p-[8px] rounded-[50%] bg-[#F1F5F9] text-[#94a3b8]"
      />
      <div className="photo-con flex flex-col items-center gap-[24px] mt-[96px]">
        <div className=" gap-[8px]  mx-[1.25rem] flex flex-col">
          <p className=" leading-[150%] font-[Abel] text-[#020617] text-[1.25rem] font-[400] opacity-[85%]">
            Choose profile photo.
          </p>
          <p className=" text-[1rem] text-[#020617] opacity-[70%] font-[Abel] leading-[170%] font-[400]">
            Choose a profile photo from your library or select an avatar to add
            to your profile
          </p>
        </div>
        <div className="bg-[#F1F5F9] w-[90%] mx-auto p-[5px] rounded-[8px]">
          <button
            onClick={() => handleToggle()}
            className={`w-1/2 px-[16px] py-[8px] rounded-[8px] ${
              isAvatarTab ? "text-[#000]" : "bg-[#1898A0] text-[#ffffff]"
            } text-center text-[0.875rem] leading-[170%]`}
          >
            Choose photo
          </button>
          <button
            onClick={() => handleToggle()}
            className={`w-1/2 px-[16px] py-[8px] rounded-[8px] text-center text-[0.875rem] leading-[170%] ${
              isAvatarTab ? "bg-[#1898A0] text-[#ffffff]" : ""
            }`}
          >
            Avatar
          </button>
        </div>
        {!isAvatarTab ? (
          <>
            <div
              onClick={() => setUploadPhotoPopUp(true)}
              className="profile-pic w-[328px] h-[328px] border-[2px] border-[#020617] rounded-full bg-[rgb(241,245,249)] border-opacity-[6%]"
            >
              {
                <img
                  src={profileURL || selectedAvatar || ""}
                  alt="profile"
                  className="w-full h-full rounded-full"
                />
              }
            </div>

            <div
              onClick={() => setUploadPhotoPopUp(true)}
              className="flex items-center justify-center mx-auto border-[1px] border-[#020617]  border-opacity-[12%] rounded-[20px]  py-[8px] px-[15px] gap-[8px] bg-[#F8FAFC]"
            >
              <img
                className=" w-[22px] h-[22px] overflow-hidden "
                alt=""
                src="/ucamera@2x.png"
              />
              <p className="text-[#020617] text-opacity-[85%] font-[400] text-[1rem] leading-[1.4875]">
                Edit photo
              </p>
            </div>

            {uploadPhotoPopUp && (
              <div
                className=" flex items-center justify-center fixed top-0 left-0 w-full h-full z-999 bg-[rgba(0,0,0,0.8)]"
              >
                <div className=" fixed w-[95%] bottom-0 h-[309px] border-[2px] bg-[#fff] rounded-tl-[32px] rounded-tr-[32px] animate-upload-popup">
                  <hr
                    onClick={() => setUploadPhotoPopUp(false)}
                    className="w-[50px] mx-auto bg-[rgba(2,6,23,0.25)] h-[5px] mt-[14px] border-none"
                  />
                  <p className=" mx-[20px] my-[28px] text-[1.25rem] ">
                    Upload your photo
                  </p>
                  <label className="w-full leading-[170%] border-b-[2px] flex gap-[8px] items-center py-[18px] px-[20px] text-[1rem]">
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handlePhotoUpload(e.target.files[0])}
                    />
                    <span>
                      <IoImageOutline className="w-[20px] h-[20px]" />
                    </span>
                    View photo library
                  </label>
                  <p className="w-full leading-[170%] border-b-[2px] flex gap-[8px] items-center py-[18px] px-[20px] text-[1rem]">
                    <span>
                      <MdOutlineCameraAlt className="w-[20px] h-[20px]" />
                    </span>
                    Take a photo
                  </p>
                  <p
                    onClick={() => handleDeletePhoto()}
                    className="w-full leading-[170%] text-[#DC2626] flex gap-[8px] items-center py-[18px] px-[20px] text-[1rem]"
                  >
                    <span>
                      <RiDeleteBin6Line className="w-[20px] h-[20px]" />
                    </span>
                    Remove photo
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-wrap gap-[8px] justify-center overflow-x-auto">
            {AvatarProfiles.map((profile, index) => {
              return (
                <img
                  className={`avtar-w w-[80px] rounded-full !hover:border-[#1898A0] !hover:border-[2px] ${
                    selectedAvatar === profile.path
                      ? "border-[2px] border-[#1898A0]"
                      : ""
                  }`}
                  key={index}
                  src={profile.path}
                  onClick={() => handleAvatarClick(profile.path)}
                />
              );
            })}
          </div>
        )}
      </div>
      <button
        onClick={() => handleSave()}
        className={`${
          uploadPhotoPopUp && "hidden"
        } bottom-btn text-[#1898A0] leading-[170%] absolute border-[1px] border-[#1898A0] bottom-10 bg-[#ffffff] px-[16px] py-[11px] w-[90%] rounded-[12px] hover:bg-[#1898A0] hover:text-[#FFF]`}
      >
        Save
      </button>
    </div>
  );
};

export default ChooseProfilePhoto;

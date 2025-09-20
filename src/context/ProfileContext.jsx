import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: "BlazeHunter",
    email: "user@example.com",
    phone: "+91 9876543210",
    avatar: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    dob: "",
    gender: "Male",
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

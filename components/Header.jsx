import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HeaderLink from "./HeaderLink";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, themes } = useTheme();

  //   after mounted, we have access to the theme
  useEffect(() => setMounted(true), []);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F2F3EF] dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-4 focus-within:shadow-lg">
      {/* left */}
      <div className="flex items-center w-full max-w-xs space-x-2">
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image
                src="/img/linkedin-logo-white.png"
                width={45}
                height={45}
                alt=""
              />
            ) : (
              <Image
                src="/img/linkedin-logo-blue.svg"
                width={55}
                height={55}
                alt=""
              />
            )}
          </>
        )}
        <div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRoundedIcon />
          <input
            type="text"
            className="flex-grow hidden text-sm bg-transparent md:inline-flex focus:outline-none placeholder:text-black/70 dark:placeholder:text-white/75"
            placeholder="Search"
          />
        </div>
      </div>
      {/* right */}
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />

        {/* Dark mode toggle */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
              resolvedTheme === "dark" ? "justify-end" : "justify-start"
            }`}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className="absolute left-0">🌜</span>
            <motion.div
              className="z-40 w-5 h-5 bg-white rounded-full"
              layout
              transition={spring}
            />
            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

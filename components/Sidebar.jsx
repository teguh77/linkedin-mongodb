import React from "react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import AddRounded from "@mui/icons-material/AddRounded";
import BookmarkOutlined from "@mui/icons-material/BookmarkOutlined";
import { signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="max-w-lg space-y-2 min-w-max">
      {/* Top */}
      <div className="bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden flex flex-col relative items-center text-center border border-gray-300 dark:border-none">
        <div className="relative w-full h-14">
          <Image src="/img/bg-profile.jpg" layout="fill" alt="" />
        </div>
        <Avatar
          onClick={signOut}
          src={session?.user?.image}
          className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
        />
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className="cursor-pointer hover:underline decoration-purple-700 underline-offset-2">
            {session?.user?.name}
          </h4>
          <p className="text-sm text-black/60 dark:text-white/75">
            {session?.user?.email}
          </p>
        </div>

        <div className="hidden text-sm text-left md:inline dark:text-white/75">
          <div className="font-medium sidebar-button space-y-0.5">
            <div className="flex justify-between space-x-2 ">
              <h4>Who viewed your profile</h4>
              <span className="text-blue-500">321</span>
            </div>
            <div className="flex justify-between space-x-2">
              <h4>Views of your post</h4>
              <span className="text-blue-500">1,800</span>
            </div>
          </div>

          <div className="sidebar-button">
            <h4 className="text-sm leading-4">
              Access exclusive tools & insights
            </h4>
            <h4 className="flex items-center font-medium dark:text-white">
              <span className="inline-block w-3 h-3 mr-1 rounded-sm bg-gradient-to-tr from-yellow-700 to-yellow-200"></span>
              Try Premium for free
            </h4>
          </div>

          <div className="sidebar-button flex items-center space-x-1.5">
            <BookmarkOutlined className="!-ml-1" />
            <h4 className="font-medium dark:text-white">My Items</h4>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="hidden md:flex dark:bg-[#1D2226] dark:text-white/75 text-black/70 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky border border-gray-200 dark:border-none">
        <p className="sidebar-link">Groups</p>
        <div className="flex items-center justify-between">
          <p className="sidebar-link">Events</p>
          <AddRounded className="!h-5" />
        </div>
        <p className="sidebar-link">Followed Hashtags</p>
        <div className="text-center sidebar-button">
          <h4 className="text-sm font-medium dark:text-white">Discover More</h4>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

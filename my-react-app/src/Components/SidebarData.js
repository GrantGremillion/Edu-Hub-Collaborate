import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Classes",
    path: "/ClassesDisplay",
    icon: <AiIcons.AiFillDatabase />,
    cName: "nav-text",
  },
  /*
  {
    title: "Current Class",
    path: "/TClassOptions",
    icon: <IoIcons.IoIosAperture />,
    cName: "nav-text",
  },
  */
  {
    title: "Zoom",
    path: "https://app.zoom.us/wc/home",
    icon: <AiIcons.AiOutlineVideoCameraAdd />,
    cName: "nav-text",
  },
  /*
  {
    title: "Questions",
    path: "/ChatInterface/${class_id}",
    icon: <AiIcons.AiFillWechat />,
    cName: "nav-text",
  },
  */
  {
    title: "Profile",
    path: "/UserProfile",
    icon: <IoIcons.IoIosContact />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/UserAccountSettings",
    icon: <IoIcons.IoIosCog />,
    cName: "nav-text",
  },

];
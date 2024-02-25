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
    title: "Questions",
    path: "/ChatInterface",
    icon: <IoIcons.IoIosChatboxes />,
    cName: "nav-text",
  },
  {
    title: "Class",
    path: "/TClassOptions",
    icon: <IoIcons.IoIosAperture />,
    cName: "nav-text",
  },
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
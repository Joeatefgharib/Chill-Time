import navListData from "../data/navListData.js";
import NavListItem from "./NavListItem.jsx";
import "./header.css";
import Search from "./Search.jsx";
import { Link } from "react-router-dom";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const handleMenu = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <header
        className={
          isActive
            ? " bg-black w-full h-[100vh]"
            : "header fixed flex items-center  right-0 pt-[30px] pr-[30px] pl-[30px] duration-[0.5s] z-50"
        }
      >
        <Link to={`/`}>
          <a
            className={
              isActive
                ? "logo hidden"
                : "logo text-4xl text-white font-extrabold mr-6"
            }
          >
            ChillTime
          </a>
        </Link>
        <div
          id="nav-container"
          className={
            isActive
              ? " text-white hidden "
              : " text-white pr-40 fixed left-1/2  "
          }
        >
          <ul className={isActive ? " lg:hidden" : "hidden lg:flex"}>
            {navListData.map((nav) => (
              <NavListItem key={nav.id} nav={nav} />
            ))}
          </ul>
        </div>
        <div className={isActive ? "hidden" : "hidden lg:flex fixed left-12"}>
          <Search />
        </div>
        <IoIosMenu
          className={
            isActive
              ? " hidden"
              : " lg:hidden sm:visible w-[2.5em] h-[2.5em] cursor-pointer text-white fixed left-[30px] duration-[0.5s]"
          }
          onClick={handleMenu}
        />
        <IoMdClose
          className={
            !isActive
              ? "hidden"
              : " lg:hidden sm:visible w-[2.5em] h-[2.5em] cursor-pointer text-white fixed top-[30px] right-[30px] "
          }
          onClick={handleMenu}
        />
        <div
          id="mobile-nav-container"
          className={
            isActive
              ? " text-white fixed right-[50px] top-[100px]"
              : " text-white hidden"
          }
        >
          <ul className=" grid gap-3 pb-6">
            {navListData.map((nav) => (
              <NavListItem key={nav.id} nav={nav} />
            ))}
          </ul>
          <div className={isActive ? " search " : "search hidden"}>
            <Search />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

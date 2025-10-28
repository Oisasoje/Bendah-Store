import { Anton } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { IoBagOutline } from "react-icons/io5";
import { FaAngleRight, FaX } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const Header = ({ setIsOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount (in case already scrolled)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-149 w-full  bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="flex  items-center justify-between w-full px-4 sm:px-6 md:px-10 py-4 md:py-10">
        {/* MOBILE LEFT SECTION */}
        <button className="md:hidden z-10" onClick={() => setMenuOpen(true)}>
          {!menuOpen && <RxHamburgerMenu size={26} />}
        </button>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.aside
              className="md:hidden fixed bottom-0 pt-8 left-0 z-150  top-0 w-full flex flex-col gap-4   font-semibold bg-white shadow-inner"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <div className="w-full px-4 flex items-center justify-between">
                {/* LEFT: Bendah Store */}
                <Link
                  href="#"
                  className="text-2xl sm:text-3xl bg-clip-text text-transparent bg-linear-to-r from-black to-gray-400"
                >
                  <span className="flex p-2 sm:p-3 items-center gap-1">
                    <span className={`${anton.className} tracking-[0.05em]`}>
                      bendah
                    </span>
                    <span
                      className={`${anton.className} font-extrabold tracking-[0.05em]`}
                    >
                      store
                    </span>
                  </span>
                </Link>

                {/* RIGHT: Cancel Button */}
                <button onClick={() => setMenuOpen(false)}>
                  <FaX size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 py-5 px-6 ">
                {["Women", "Men", "Kids", "Sports"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="flex text-2xl items-center justify-between py-1 border-gray-200"
                  >
                    <span>{item}</span> <FaAngleRight />
                  </Link>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        <Link
          href="#"
          className=" 
      text-2xl sm:text-3xl absolute  md:static md:left-0 md:translate-0 left-1/2 transform -translate-x-1/2 bg-clip-text text-transparent bg-linear-to-r from-black to-gray-400"
        >
          <span className="flex p-2 sm:p-3 items-center gap-1">
            <span className={`${anton.className} tracking-[0.05em]`}>
              bendah
            </span>
            <span
              className={`${anton.className} font-extrabold tracking-[0.05em]`}
            >
              store
            </span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 font-semibold text-xl absolute md:static right-10">
          {["Women", "Men", "Kids", "Sports"].map((item) => (
            <Link
              key={item}
              href="#"
              className="flex items-center gap-1 hover:text-gray-600 transition-colors"
            >
              {item} <FaAngleDown />
            </Link>
          ))}
        </nav>
        {/* RIGHT SECTION */}
        <div className="flex items-center gap-5 sm:gap-8">
          <Link href="#" className="cursor-pointer hover:opacity-70">
            <CiSearch
              strokeWidth={1}
              onClick={() => setIsOpen(true)}
              size={30}
            />
          </Link>
          <Link href="#" className="hover:opacity-70">
            <CiUser strokeWidth={1} size={30} />
          </Link>
          <Link href="#" className="md:block hidden hover:opacity-70">
            <IoBagOutline strokeWidth={1} size={30} />
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;

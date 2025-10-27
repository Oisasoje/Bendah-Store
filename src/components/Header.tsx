import { Anton } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";

const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
});

const Header = ({ isOpen, setIsOpen }) => {
  const [scrolled, setScrolled] = useState(false);
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
      className={`top-0  left-0 right-0 flex items-center py-7 bg-white transition-shadow z-100 duration-300 ${
        scrolled ? "shadow-md" : ""
      } pt-10 fixed`}
    >
      <div className="flex px-10 justify-between w-full items-center">
        <Link
          className="text-3xl  bg-clip-text bg-linear-to-r text-transparent from-black to-gray-400 "
          href="#"
        >
          <span className="flex border-4 rounded-xl border-red-600 p-3 items-center gap-1">
            <span className={`${anton.className} tracking-[0.05em]`}>
              bendah
            </span>{" "}
            <span
              className={`${anton.className} font-extrabold tracking-[0.05em]`}
            >
              store
            </span>{" "}
          </span>
        </Link>

        <nav className="flex gap-8 font-semibold text-lg">
          <Link className="flex items-center gap-1" href="#">
            Women <FaAngleDown />
          </Link>
          <Link className="flex items-center gap-1" href="#">
            Men <FaAngleDown />
          </Link>
          <Link className="flex items-center gap-1" href="#">
            Kids <FaAngleDown />
          </Link>
          <Link className="flex items-center gap-1" href="#">
            Sports <FaAngleDown />
          </Link>
        </nav>
        <nav className="flex gap-8">
          <Link href="#" className="cursor-pointer hover:opacity-65">
            <CiSearch
              onClick={() => setIsOpen(true)}
              size={30}
              strokeWidth={1}
            />
          </Link>
          <Link href="#">
            <CiUser size={30} strokeWidth={1} />
          </Link>
          <Link href="#">
            <IoBagOutline size={30} strokeWidth={1} />
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;

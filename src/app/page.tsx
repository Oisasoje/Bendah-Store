"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { getAllProducts } from "../../lib/queries/getAllProducts";
import Image from "next/image";
import { Nunito, Anton } from "next/font/google";
import { CiCircleCheck, CiDollar, CiSearch, CiUser } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import {
  FaAngleDown,
  FaAngleRight,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { LuSparkle } from "react-icons/lu";
import { FaX, FaXTwitter } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

const nunito = Nunito({
  weight: ["200", "300", "400", "600", "800", "1000"],
  subsets: ["latin"],
});
const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
});

const products = [
  {
    imgPath: "Sneaker1",
    brand: "Nike",
    name: "Dunk Low Retro Sneakers",
    price: "₦206,550.00",
  },
  {
    imgPath: "Sneaker2",
    brand: "Puma",
    name: "RS-X3 Mesh Pop  Pink Sneaker ",
    price: "₦399,874.21",
  },
  {
    imgPath: "Sneaker3",
    brand: "Nike",
    name: "Renew Run 2 Running Sneaker",
    price: "₦145,223.00",
  },
  {
    imgPath: "Sneaker5",
    brand: "Puma",
    name: "Pelermo Unisex Sneaker",
    price: "₦287,336.10",
  },
  {
    imgPath: "Hat1",
    brand: "Panama",
    name: "Fedora Fashion Hats",
    price: "₦19,350.62",
  },
  {
    imgPath: "Hat2",
    brand: "LD",
    name: "Blue Trucker Hat",
    price: "₦33,116.00",
  },
  {
    imgPath: "Shirt1",
    brand: "Force Majeure",
    name: "White and Gray Unisex T-Shirt",
    price: "₦49,110.31",
  },
  {
    imgPath: "Shirt2",
    brand: "Grunge",
    name: "White Oversized Button-Up Shirt",
    price: "₦37,821.50",
  },
];

const bannerProducts = [
  {
    imgPath: "White Male and Female Models.jpg",

    name: "Wrangler",
  },
  {
    imgPath: "Brown Sneakers.jpg",

    name: "Louis Vuitton X Nike",
  },
  {
    imgPath: "Black Lady in Blue Shirt.jpg",

    name: "Tory Burch",
  },
  {
    imgPath: "Black Girl in Black Cardigan.jpg",

    name: "Shein",
  },
];

const reebokShoes = [
  {
    imgPath: "Reebok1.webp",
    brand: "Reebok",
    name: "Angel Reese 1 Basketball Shoes",
    oldPrice: "230,687.90",
    discount: 30,
  },
  {
    imgPath: "Reebok2.webp",
    brand: "Reebok",
    name: "Club C Ground UK Shoes",
    oldPrice: "155,074.30",
    discount: 30,
  },
  {
    imgPath: "Reebok3.webp",
    brand: "Reebok",
    name: "Engine A Basketball Shoes",
    oldPrice: "211,500.00",
    discount: 30,
  },
  {
    imgPath: "Reebok4.webp",
    brand: "Reebok",
    name: "Pump Omni II Shoes",
    oldPrice: "183,127.86",
    discount: 30,
  },
];

const rombautShoes = [
  {
    imgPath: "Rombaut1.webp",
    brand: "Rombaut",
    name: "NUCLEO VOLCANIC WHITE",
    price: "831,831.14",
  },
  {
    imgPath: "Rombaut2.webp",
    brand: "Rombaut",
    name: "Dysphoria Thigh HI Black",
    price: "1,300,100.00",
  },
  {
    imgPath: "Rombaut3.webp",
    brand: "Rombaut",
    name: "Rombaut X Puma Levitation Green",
    price: "689,221.14",
  },
  {
    imgPath: "Rombaut4.webp",
    brand: "Rombaut",
    name: "Ground I Silver",
    price: "231,831.14",
  },
];

const categories = [
  {
    imgPath: "Footware.jpg",
    category: "Footwear",
  },
  {
    imgPath: "Lifestyle.jpg",
    category: "Lifestyle",
  },
  {
    imgPath: "Fashion.jpg",
    category: "Fashion",
  },
  {
    imgPath: "Summer.jpg",
    category: "Summer",
  },
  {
    imgPath: "Clothing.jpg",
    category: "Clothing",
  },
  {
    imgPath: "Sports.jpg",
    category: "Sports",
  },
];

const allProducts = [
  ...bannerProducts.map((product) => ({
    ...product,
    brand: product.name,
    price: null,
    oldPrice: null,
    discount: null,
    type: "banner",
  })),

  ...reebokShoes.map((product) => ({
    ...product,
    type: "shoe",
  })),

  ...rombautShoes.map((product) => ({
    ...product,
    oldPrice: null,
    discount: null,
    type: "shoe",
  })),
];

const HomePage = () => {
  // const products = await getAllProducts();
  const [insetIndex, setInsetIndex] = useState<null | number>(null);
  const [showInset, setShowInset] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase().trim();
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        (product.brand && product.brand.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  const closeSidebar = () => {
    setSearchTerm("");
    setIsOpen(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      setTimeout(() => {
        document.body.classList.remove("overflow-hidden");
      }, 800);
    }
  }, [isOpen]);

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

  const displayInset = (i: number | null) => {
    setInsetIndex(i);
  };

  if (!isMounted) return null;
  return (
    <div
      className={`bg-white  relative text-black ${
        isOpen ? "overflow-y-hidden" : ""
      } min-h-screen w-full`}
    >
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside
            className="fixed text-black z-150 px-6 pt-5 py-8 bg-white top-0 right-0 h-screen w-7/20 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-3xl tracking-wider">Search</span>
              <motion.span
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              >
                <FaX onClick={closeSidebar} size={20} />
              </motion.span>
            </div>

            <div className="relative w-full mt-7 mb-6">
              <input
                type="text"
                placeholder="Search products, brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-200 focus:ring-1 focus:ring-black outline-none py-4 pl-14 pr-10 rounded-lg w-full"
              />
              <IoIosSearch
                color="black"
                size={24}
                className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {searchTerm && (
                <div className="mb-4">
                  <p className="text-gray-600 text-sm">
                    Found {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""} for &quot;
                    {searchTerm}
                    &quot;
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {filteredProducts.map((product, index) => {
                  const src = product.imgPath.trimEnd();
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-20">
                          <Image
                            src={`/assets/${src.trim()}`}
                            alt={product.name}
                            width={200}
                            height={200}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">
                            {product.name}
                          </h3>

                          {product.brand && product.brand !== product.name && (
                            <p className="text-gray-600 text-xs mt-1">
                              {product.brand}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {searchTerm && filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl mb-3">😕</div>
                  <p className="text-gray-500 text-sm mb-2">
                    No products found for &quot;{searchTerm}&quot;
                  </p>
                  <p className="text-gray-400 text-xs">
                    Try different keywords
                  </p>
                </motion.div>
              )}

              {!searchTerm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-gray-500 text-sm">
                    Search for products and brands
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Try: Wrangler, Reebok, Rombaut, Nike, etc.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute hover:cursor-zoom-out top-0 left-0 z-101 min-h-screen w-full bg-black/40"
        />
      )}
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

      <main className={`${nunito.className} pt-40  `}>
        <section className="grid px-10 mb-10 gap-5 text-black grid-cols-6 w-full">
          {categories.map(({ imgPath, category }, i) => (
            <div className="flex items-center flex-col gap-4" key={i}>
              <motion.img
                className="w-100 object-cover cursor-pointer rounded-lg overflow-hidden"
                src={`/assets/${imgPath}`}
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ scale: 1.06 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <p className="text-xl font-bold tracking-wider uppercase">
                {category}
              </p>
            </div>
          ))}
        </section>
        <div className="overflow-hidden whitespace-nowrap  text-black border border-gray-400 p-2 mt-4 mb-10">
          <div className="flex animate-marquee">
            <span className="mx-8 text-lg font-semibold">
              {"GET 10% OFF ON YOUR FIRST ORDER — ".repeat(8)}
            </span>
            <span className="mx-8 text-lg font-semibold">
              {"GET 10% OFF ON YOUR FIRST ORDER — ".repeat(8)}
            </span>
          </div>

          <style jsx>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .animate-marquee {
              display: flex;
              width: 200%;
              animation: marquee 15s linear infinite;
            }
          `}</style>
        </div>

        <nav className={` ${nunito.className} flex gap-10 ml-10 mb-8`}>
          <Link className="text-3xl font-semibold" href="#">
            Must Have
          </Link>
          <Link className="text-3xl text-gray-500 font-semibold" href="#">
            Most Popular
          </Link>
          <Link className="text-3xl font-semibold text-gray-500" href="#">
            Sale
          </Link>
        </nav>
        <section className="grid grid-cols-4 gap-8 px-10">
          {products.map(({ imgPath, brand, name, price }, i) => (
            <div
              onMouseEnter={() => {
                displayInset(i);
                setShowInset(true);
              }}
              onMouseLeave={() => {
                displayInset(null);
                setShowInset(false);
              }}
              className={`flex cursor-pointer ${nunito.className} relative flex-col`}
              key={i}
            >
              <Link className="cursor-pointer" href="#">
                <motion.div
                  className="w-70 perspective-[1000px] relative rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.img
                    className="w-full object-cover"
                    src={`/assets/${imgPath}.jpg`}
                    width={200}
                    height={200}
                    alt={name}
                    animate={{
                      scale: showInset && insetIndex === i ? 1.06 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {isMounted && (
                    <AnimatePresence mode="wait">
                      {showInset && insetIndex === i && (
                        <motion.div
                          key={`overlay-${i}`} //
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="absolute bg-black rounded-full w-13 justify-center items-center h-13 flex top-5 right-6"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <CiSearch
                              strokeWidth={1.5}
                              size={30}
                              color="white"
                            />
                          </motion.div>

                          <motion.div
                            className="absolute w-full bottom-6 px-7"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <button className="bg-black cursor-pointer text-white font-semibold w-full rounded-lg py-3">
                              SHOP NOW
                            </button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              </Link>

              <div className="flex flex-col gap-1 mt-4">
                <Link href="#">
                  <p className="tracking-wide text-gray-500">{brand}</p>
                </Link>
                <Link href="#">
                  <p className="font-bold uppercase">{name}</p>
                </Link>
                <Link href="#">
                  <p className="font-extrabold">{price}</p>
                </Link>
              </div>
            </div>
          ))}
        </section>
        <section className={`bg-[#C4C4C3] flex h-63 w-full px-10 mb-10 mt-9`}>
          <div className="flex justify-center flex-1/3 gap-6 flex-col ">
            <p className="font-bold tracking-wider text-sm uppercase">
              Beyond basics - essentials, sharpened to distinction.
            </p>
            <p className="font-bold text-2xl">ICONIC STYLES</p>
            <p className="text-lg">
              Step into our refined collection – pieces built for those who pair
              simplicity with edge.
            </p>
          </div>
          <div className="flex-2/3 flex gap-5 justify-end items-center">
            {bannerProducts.map(({ imgPath, name }, i) => (
              <Link key={i} href="#">
                <div className="flex items-center flex-col gap-6">
                  <div className="w-40 rounded-lg overflow-hidden">
                    <motion.img
                      className="w-full object-cover"
                      src={`/assets/${imgPath}`}
                      width={200}
                      height={200}
                      alt={name}
                      whileHover={{
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xl font-semibold whitespace-normal uppercase mt-6 tracking-wider">
                    {name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="">
          <h3 className="font-bold text-3xl text-center uppercase">
            This Season&apos;s Fire
          </h3>
          <nav className="flex gap-10 mb-8 ml-10 mt-7">
            <Link className="text-3xl font-semibold" href="#">
              REEBOK
            </Link>
            <Link className="text-3xl text-gray-500 font-semibold" href="#">
              PUMA
            </Link>
            <Link className="text-3xl text-gray-500 font-semibold" href="#">
              EYTYS
            </Link>
            <Link className="text-3xl text-gray-500 font-semibold" href="#">
              ROMBAUT
            </Link>
          </nav>
          <section className="grid grid-cols-4 gap-8 px-10">
            {reebokShoes.map(
              ({ imgPath, brand, name, oldPrice, discount }, i) => {
                const calcPrice = (
                  ((100 - discount) / 100) *
                  Number(oldPrice.replace(/,/g, ""))
                ).toFixed(2);
                const newPrice = Number(calcPrice).toLocaleString("en-Ng", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
                return (
                  <div
                    onMouseEnter={() => {
                      displayInset(i);
                      setShowInset(true);
                    }}
                    onMouseLeave={() => {
                      displayInset(null);
                      setShowInset(false);
                    }}
                    className={`flex cursor-pointer ${nunito.className} relative flex-col`}
                    key={i}
                  >
                    <Link className="cursor-pointer" href="#">
                      <motion.div
                        className="w-70 perspective-[1000px] relative rounded-xl overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.img
                          className="w-full object-cover"
                          src={`/assets/${imgPath}`}
                          width={200}
                          height={200}
                          alt={name}
                          animate={{
                            scale: showInset && insetIndex === i ? 1.06 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Discount Badge */}
                        <div className="absolute px-2 rounded-lg left-5 top-5 bg-red-600 text-sm font-bold text-white">
                          -{discount}%
                        </div>

                        {/* Hover Overlay */}
                        {isMounted && (
                          <AnimatePresence mode="wait">
                            {showInset && insetIndex === i && (
                              <motion.div
                                key={`overlay-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <motion.div
                                  className="absolute bg-black rounded-full w-13 justify-center items-center h-13 flex top-5 right-6"
                                  initial={{ x: 20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  exit={{ x: 20, opacity: 0 }}
                                  transition={{ duration: 0.4 }}
                                >
                                  <CiSearch
                                    strokeWidth={1.5}
                                    size={30}
                                    color="white"
                                  />
                                </motion.div>

                                <motion.div
                                  className="absolute w-full bottom-6 px-7"
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 20, opacity: 0 }}
                                  transition={{ duration: 0.4 }}
                                >
                                  <button className="bg-black cursor-pointer text-white font-semibold w-full rounded-lg py-3">
                                    SHOP NOW
                                  </button>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </motion.div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex flex-col gap-1 mt-4">
                      <Link href="#">
                        <p className="tracking-wide text-gray-500">{brand}</p>
                      </Link>
                      <Link href="#">
                        <p className="font-bold uppercase">{name}</p>
                      </Link>
                      <Link href="#" className="flex gap-2">
                        <p className="font-extrabold text-red-500">
                          ₦{newPrice}
                        </p>
                        <p className="font-semibold text-gray-500 line-through">
                          ₦{oldPrice}
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              }
            )}
          </section>
          <section className=" mx-10 mt-20 mb-15 ">
            <h3 className="uppercase mb-8 font-extrabold text-3xl">
              This Week&apos;s Drop
            </h3>
            <Swiper
              key="rombaut-shoes-swiper"
              modules={[Navigation, Pagination]} // install Swiper modules
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              navigation={true}
              className="my-swiper py-10"
            >
              {rombautShoes.map(({ imgPath, brand, name, price }, i) => (
                <SwiperSlide key={i}>
                  <div className="flex gap-15 w-full items-center rounded-lg overflow-hidden">
                    <div
                      className="w-1/2 cursor-pointer border-4 rounded-lg overflow-hidden"
                      onMouseEnter={() => {
                        displayInset(i);
                        setShowInset(true);
                      }}
                      onMouseLeave={() => {
                        displayInset(null);
                        setShowInset(false);
                      }}
                    >
                      <motion.img
                        src={`/assets/${imgPath}`}
                        alt={name}
                        width={200}
                        height={200}
                        className="w-full object-cover"
                        animate={{
                          scale: showInset && insetIndex === i ? 1.06 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="flex w-1/2 gap-10 justify-between h-full  w flex-col">
                      <div className="p-4  flex flex-col gap-8">
                        <p className="font-semibold text-2xl">{brand}</p>
                        <Link
                          href="#"
                          className="font-bold uppercase  text-3xl"
                        >
                          {name}
                        </Link>
                        <p className="font-bold text-2xl">₦{price}</p>
                      </div>
                      <button className="bg-black uppercase px-5 hover:opacity-80 cursor-pointer py-4 w-fit text-lg rounded-xl font-bold text-white ">
                        Order This Product
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </section>
        <section className="flex justify-center mb-3 gap-5">
          <p className="flex gap-2 items-center text-lg border-2 border-gray-200 p-3 rounded-full">
            <span className="bg-gray-300 rounded-full p-2">
              <BsBoxSeam size={20} />
            </span>
            Free Shipping
          </p>
          <p className="flex gap-2 items-center text-lg border-2 border-gray-200 p-3 rounded-full">
            <span className="bg-gray-300 rounded-full p-2">
              <LuSparkle size={20} />
            </span>
            100% Originals Product
          </p>
          <p className="flex gap-2 items-center text-lg border-2 border-gray-200 p-3 rounded-full">
            <span className="bg-gray-300 rounded-full p-2">
              <CiCircleCheck size={20} />
            </span>
            Customer Service
          </p>
          <p className="flex gap-2 items-center text-lg border-2 border-gray-200 p-3 rounded-full">
            <span className="bg-gray-300 rounded-full p-2">
              <CiDollar size={20} />
            </span>
            Secure Online Payment
          </p>
        </section>
      </main>
      <footer className="bg-[#C4C4C3] pt-20 pb-20 w-full h-full   px-15">
        <div className="justify-between flex gap-10 ">
          <section className="text-nowrap mt-4 flex flex-col">
            <p className="text-3xl mb-1 font-semibold tracking-wide">
              Subscribe to our Newsletter
            </p>
            <p className="text-sm mb-8">
              Get the latest updates on new products & upcoming sales
            </p>
            <div className=" relative flex items-center w-full mb-4">
              <input
                type="email"
                className="bg-white focus:ring-2 focus:ring-red-400 transition-all focus:ring-offset-2 py-3 px-5 outline-none w-full  rounded-xl"
              />
              <span className="p-2 absolute hover:bg-black transition-colors duration-500 hover:text-white  cursor-pointer right-2">
                <FaAngleRight size={20} />
              </span>
            </div>
            <p className="text-sm mb-3">
              By subscribing you agree to the{" "}
              <span className="underline cursor-pointer underline-offset-3">
                Terms of Use
              </span>{" "}
              &{" "}
              <span className="underline cursor-pointer underline-offset-3">
                Privacy Policy
              </span>
              .
            </p>
            <p className="text-sm">
              Thomas Balogun Street, 202333 Lagos LA, Nigeria
            </p>
          </section>
          <section className="flex gap-3  flex-col">
            <p className="font-semibold">Bendah Store</p>
            <Link href="#">About</Link>
            <Link href="#">Locations</Link>
          </section>
          <section className=" flex gap-3  flex-col">
            <p className="font-semibold">Contact</p>
            <Link href="#">FAQs</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Terms & Conditions</Link>
          </section>
          <section className=" flex gap-3 flex-col">
            <p className="font-semibold">Shop</p>
            <Link href="#">Puma</Link>
            <Link href="#">Nike</Link>
            <Link href="#">Rombaut</Link>
            <Link href="#">Panama</Link>
            <Link href="#">Grunge</Link>
          </section>
          <section className=" flex gap-3 flex-col">
            <p className="font-semibold">Latest Edits</p>
            <Link href="#">Sports</Link>
            <Link href="#">Summer</Link>
            <Link href="#">Fashion</Link>
            <Link href="#">Lifestyle</Link>
            <Link href="#">Most Popular</Link>
            <Link href="#">New In</Link>
          </section>
        </div>
        <section className="flex mt-15 gap-5">
          <FaFacebook size={25} />
          <FaXTwitter size={25} />
          <FaInstagram size={25} />
        </section>
        <span className="flex gap-1 items-center mt-6">
          <p className="text-xl">&#169;</p>
          <p className="text-lg  tracking-wide font-semibold">
            2025 Victor | Built with Next.js + Shopify&apos;s StoreFront API
          </p>
        </span>
      </footer>
    </div>
  );
};

export default HomePage;

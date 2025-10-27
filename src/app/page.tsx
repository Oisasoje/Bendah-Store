"use client";

import Link from "next/link";
import { SwiperSlide } from "swiper/react";

// import { getAllProducts } from "../../lib/queries/getAllProducts";

import { Nunito } from "next/font/google";
import { CiCircleCheck, CiDollar, CiSearch } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

import { BsBoxSeam } from "react-icons/bs";
import { LuSparkle } from "react-icons/lu";

import {
  products,
  reebokShoes,
  rombautShoes,
  categories,
  bannerProducts,
} from "./data/products";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import LazySwiper from "@/components/LazySwiper";

const nunito = Nunito({
  weight: ["200", "300", "400", "600", "800", "1000"],
  subsets: ["latin"],
});

const HomePage = () => {
  // const products = await getAllProducts();
  const [insetIndex, setInsetIndex] = useState<null | number>(null);
  const [showInset, setShowInset] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const discountedReebokShoes = useMemo(() => {
    return reebokShoes.map((product) => {
      const calcPrice = (
        ((100 - product.discount) / 100) *
        Number(product.oldPrice.replace(/,/g, ""))
      ).toFixed(2);
      const newPrice = Number(calcPrice).toLocaleString("en-Ng", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return {
        ...product,
        newPrice,
        formattedOldPrice: product.oldPrice, // Keep original for display
      };
    });
  }, [reebokShoes]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      setTimeout(() => {
        document.body.classList.remove("overflow-hidden");
      }, 800);
    }
  }, [isOpen]);

  const displayInset = (i: number | null) => {
    setInsetIndex(i);
  };

  if (!isMounted) return null;
  return (
    <div className="bg-white relative text-black min-h-screen w-full">
      <AnimatePresence mode="wait">
        {isOpen && <Sidebar setIsOpen={setIsOpen} />}
      </AnimatePresence>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute hover:cursor-zoom-out top-0 left-0 z-101 min-h-screen w-full bg-black/40"
        />
      )}

      <Header setIsOpen={setIsOpen} />

      <main className={`${nunito.className} pt-24 md:pt-40`}>
        {/* ===== Categories ===== */}
        <section
          className="px-4 sm:px-6 md:px-10 mb-10 text-black 
  flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide
  md:grid md:grid-cols-4 lg:grid-cols-6 md:gap-10 md:overflow-visible"
        >
          {categories.map(({ imgPath, category, blurDataURL }, i) => (
            <div
              className="shrink-0 flex flex-col items-center gap-4 w-[150px] sm:w-[180px] md:w-auto  snap-center"
              key={i}
            >
              <motion.div
                className="cursor-pointer rounded-lg overflow-hidden w-full max-w-[180px] sm:max-w-[200px]"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ scale: 1.06 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  className="w-full object-cover"
                  src={`/assets/${imgPath}`}
                  alt={category}
                  width={200}
                  height={200}
                  blurDataURL={blurDataURL}
                  priority={i >= 0}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </motion.div>
              <p className="text-base sm:text-lg md:text-xl font-bold tracking-wider uppercase text-center whitespace-nowrap">
                {category}
              </p>
            </div>
          ))}
        </section>

        {/* ===== Marquee ===== */}
        <div className="overflow-hidden whitespace-nowrap text-black border border-gray-400 p-2 mt-4 mb-10">
          <div className="flex animate-marquee">
            <span className="mx-4 sm:mx-8 text-lg sm:text-2xl font-bold">
              {"GET 10% OFF ON YOUR FIRST ORDER — ".repeat(8)}
            </span>
            <span className="mx-4 sm:mx-8 text-lg sm:text-2xl font-bold">
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

        {/* ===== Nav ===== */}
        <nav className="flex flex-wrap gap-4 sm:gap-8 md:gap-10 px-4 sm:ml-10 mb-8 text-center sm:text-left">
          <Link className="text-2xl sm:text-3xl font-semibold" href="#">
            Must Have
          </Link>
          <Link
            className="text-2xl sm:text-3xl text-gray-500 font-semibold"
            href="#"
          >
            Most Popular
          </Link>
          <Link
            className="text-2xl sm:text-3xl font-semibold text-gray-500"
            href="#"
          >
            Sale
          </Link>
        </nav>

        {/* ===== Products ===== */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-10">
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
              <Link href="#">
                <motion.div
                  className="w-full perspective-[1000px] relative rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.img
                    className="w-full image-blur object-cover"
                    src={`/assets/${imgPath}.jpg`}
                    width={200}
                    height={200}
                    alt={name}
                    onLoad={(e) =>
                      e.currentTarget.classList.remove("image-blur")
                    }
                    animate={{
                      scale: showInset && insetIndex === i ? 1.06 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

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
                            className="absolute bg-black rounded-full w-12 h-12 flex justify-center items-center top-4 right-5"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <CiSearch
                              strokeWidth={1.5}
                              size={26}
                              color="white"
                            />
                          </motion.div>

                          <motion.div
                            className="absolute w-full bottom-6 px-5"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <button className="bg-black text-white font-semibold w-full rounded-lg py-3">
                              SHOP NOW
                            </button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              </Link>

              <div className="flex flex-col gap-1 mt-3">
                <Link href="#">
                  <p className="tracking-wide text-gray-500">{brand}</p>
                </Link>
                <Link href="#">
                  <p className="font-bold uppercase text-sm sm:text-base">
                    {name}
                  </p>
                </Link>
                <Link href="#">
                  <p className="font-extrabold">{price}</p>
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* ===== Banner Section ===== */}
        <section className="bg-[#C4C4C3] py-5 flex flex-col md:flex-row h-auto md:h-63 w-full px-6 sm:px-10 mb-10 mt-9">
          {/* TEXT SECTION */}
          <div className="flex flex-col flex-1 md:flex-[0.33] justify-center gap-6 text-center md:text-left mb-6 md:mb-0">
            <p className="font-bold tracking-widest text-lg uppercase">
              Beyond basics - essentials, sharpened to distinction.
            </p>
            <p className="font-bold text-2xl">ICONIC STYLES</p>
            <p className="text-base sm:text-lg">
              Step into our refined collection – pieces built for those who pair
              simplicity with edge.
            </p>
          </div>

          {/* IMAGES SECTION */}
          <div className="flex flex-1 md:flex-[0.67] overflow-x-auto md:overflow-visible scrollbar-hide gap-5 justify-start md:justify-end items-center scroll-smooth">
            {bannerProducts.map(({ imgPath, name }, i) => (
              <Link key={i} href="#" className="shrink-0">
                <div className="flex items-center flex-col gap-6">
                  <div className="w-40 rounded-lg overflow-hidden">
                    <motion.img
                      className="w-full object-cover"
                      src={`/assets/${imgPath}`}
                      width={200}
                      height={200}
                      alt={name}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xl font-semibold whitespace-normal uppercase mt-6 tracking-wider text-center">
                    {name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== Discounted Products ===== */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-10">
          {discountedReebokShoes.map(
            (
              {
                imgPath,
                brand,
                name,
                formattedOldPrice: oldPrice,
                discount,
                newPrice,
              },
              i
            ) => (
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
                <Link href="#">
                  <motion.div
                    className="w-full perspective-[1000px] relative rounded-xl overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.img
                      className="w-full image-blur object-cover"
                      src={`/assets/${imgPath}`}
                      width={200}
                      height={200}
                      alt={name}
                      onLoad={(e) =>
                        e.currentTarget.classList.remove("image-blur")
                      }
                      animate={{
                        scale: showInset && insetIndex === i ? 1.06 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="absolute px-2 rounded-lg left-4 top-4 bg-red-600 text-xs sm:text-sm font-bold text-white">
                      -{discount}%
                    </div>

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
                              className="absolute bg-black rounded-full w-12 h-12 flex justify-center items-center top-4 right-5"
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: 20, opacity: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <CiSearch
                                strokeWidth={1.5}
                                size={26}
                                color="white"
                              />
                            </motion.div>

                            <motion.div
                              className="absolute w-full bottom-6 px-5"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 20, opacity: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <button className="bg-black text-white font-semibold w-full rounded-lg py-3">
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
                  <Link href="#" className="flex md:flex-row flex-col md:gap-2">
                    <p className="font-extrabold text-sm md:text-base text-red-500">
                      ₦{newPrice}
                    </p>
                    <p className="font-semibold text-sem md:text-base text-gray-500 line-through">
                      ₦{oldPrice}
                    </p>
                  </Link>
                </div>
              </div>
            )
          )}
        </section>
        <section className=" mx-10 mt-20 mb-15 ">
          <h3 className="uppercase mb-8 font-extrabold text-3xl">
            This Week&apos;s Drop
          </h3>
          <LazySwiper>
            {rombautShoes.map(({ imgPath, brand, name, price }, i) => (
              <SwiperSlide key={i}>
                <div className="flex-col md:flex-row flex gap-15 w-full justify-start rounded-lg overflow-hidden">
                  <div
                    className=" w-full md:w-1/2 cursor-pointer border-4 rounded-lg overflow-hidden"
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
                      className="w-full image-blur object-cover"
                      onLoad={(e) => {
                        e.currentTarget.classList.remove("image-blur");
                      }}
                      animate={{
                        scale: showInset && insetIndex === i ? 1.06 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="flex w-full md:w-1/2 gap-6 md:gap-10 justify-between h-full  w flex-col">
                    <div className="p-4  flex flex-col gap-4 md:gap-8">
                      <p className="font-semibold text-lg md:text-2xl">
                        {brand}
                      </p>
                      <Link
                        href="#"
                        className="font-bold uppercase text-xl md:text-3xl"
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
          </LazySwiper>
        </section>
      </main>

      {/* ===== Features Section ===== */}
      <section className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-4 sm:gap-5 mb-3 px-4 overflow-x-auto scrollbar-hide sm:overflow-visible ">
        <p className="flex gap-2 items-center text-base sm:text-lg border-2 border-gray-200 p-2 sm:p-3 rounded-full shrink-0">
          <span className="bg-gray-300 rounded-full p-2">
            <BsBoxSeam size={20} />
          </span>
          Free Shipping
        </p>
        <p className="flex gap-2 items-center text-base sm:text-lg border-2 border-gray-200 p-2 sm:p-3 rounded-full shrink-0">
          <span className="bg-gray-300 rounded-full p-2">
            <LuSparkle size={20} />
          </span>
          100% Originals Product
        </p>
        <p className="flex gap-2 items-center text-base sm:text-lg border-2 border-gray-200 p-2 sm:p-3 rounded-full shrink-0">
          <span className="bg-gray-300 rounded-full p-2">
            <CiCircleCheck size={20} />
          </span>
          Customer Service
        </p>
        <p className="flex gap-2 items-center text-base sm:text-lg border-2 border-gray-200 p-2 sm:p-3 rounded-full shrink-0">
          <span className="bg-gray-300 rounded-full p-2">
            <CiDollar size={20} />
          </span>
          Secure Online Payment
        </p>
      </section>

      <Footer />
    </div>
  );
};
export default HomePage;

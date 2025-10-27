"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { getAllProducts } from "../../lib/queries/getAllProducts";

import { Nunito } from "next/font/google";
import { CiCircleCheck, CiDollar, CiSearch, CiUser } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    <div
      className={`bg-white  relative text-black ${
        isOpen ? "overflow-y-hidden" : ""
      } min-h-screen w-full`}
    >
      <AnimatePresence mode="wait">
        {isOpen && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
      </AnimatePresence>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute hover:cursor-zoom-out top-0 left-0 z-101 min-h-screen w-full bg-black/40"
        />
      )}
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className={`${nunito.className} pt-40  `}>
        <section className="grid px-10 mb-10 gap-20 text-black grid-cols-6 w-full">
          {categories.map(({ imgPath, category, blurDataURL }, i) => (
            <div className="flex items-center flex-col gap-4" key={i}>
              <motion.div
                className="cursor-pointer rounded-lg overflow-hidden w-45"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ scale: 1.06 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  className="w-full object-cover "
                  src={`/assets/${imgPath}`}
                  alt={`category`}
                  width={200}
                  height={200}
                  blurDataURL={blurDataURL}
                  priority={i >= 0}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </motion.div>
              <p className="text-xl font-bold tracking-wider uppercase">
                {category}
              </p>
            </div>
          ))}
        </section>
        <div className="overflow-hidden whitespace-nowrap  text-black border border-gray-400 p-2 mt-4 mb-10">
          <div className="flex animate-marquee">
            <span className="mx-8 text-2xl font-bold">
              {"GET 10% OFF ON YOUR FIRST ORDER — ".repeat(8)}
            </span>
            <span className="mx-8 text-2xl font-bold">
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
                    className="w-full image-blur object-cover"
                    src={`/assets/${imgPath}.jpg`}
                    width={200}
                    height={200}
                    alt={name}
                    onLoad={(e) => {
                      e.currentTarget.classList.remove("image-blur");
                    }}
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
                      className="w-full image-blur object-cover"
                      src={`/assets/${imgPath}`}
                      width={200}
                      height={200}
                      alt={name}
                      onLoad={(e) => {
                        e.currentTarget.classList.remove("image-blur");
                      }}
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
                          className="w-full image-blur object-cover"
                          src={`/assets/${imgPath}`}
                          width={200}
                          height={200}
                          alt={name}
                          onLoad={(e) => {
                            e.currentTarget.classList.remove("image-blur");
                          }}
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
      <Footer />
    </div>
  );
};
export default HomePage;

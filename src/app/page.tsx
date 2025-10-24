"use client";

import Link from "next/link";
// import { getAllProducts } from "../../lib/queries/getAllProducts";
import Image from "next/image";
import { Nunito } from "next/font/google";
import { CiSearch } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    imgPath: "White Male and Female Models",

    name: "Wrangler",
  },
  {
    imgPath: "Brown Sneakers",

    name: "Louis Vuitton X Nike",
  },
  {
    imgPath: "Black Lady in Blue Shirt",

    name: "Tory Burch",
  },
  {
    imgPath: "Black Girl in Black Cardigan",

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

const nunito = Nunito({
  weight: ["200", "300", "400", "600", "800", "1000"],
  subsets: ["latin"],
});

const HomePage = () => {
  // const products = await getAllProducts();
  const [insetIndex, setInsetIndex] = useState<null | number>(null);
  const [showInset, setShowInset] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayInset = (i: number | null) => {
    setInsetIndex(i);
  };

  if (!isMounted) return null;
  return (
    <section className={`${nunito.className}`}>
      <nav className={` ${nunito.className} flex gap-4 ml-10 mb-8`}>
        <Link className="text-3xl font-semibold" href="#">
          Must Have
        </Link>
        <Link className="text-3xl font-semibold" href="#">
          Most Popular
        </Link>
        <Link className="text-3xl font-semibold" href="#">
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
                    scale: showInset && insetIndex === i ? 1.1 : 1,
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
                          <CiSearch strokeWidth={1.5} size={30} color="white" />
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
                <p className="font-bold">{name}</p>
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
                    src={`/assets/${imgPath}.jpg`}
                    width={200}
                    height={200}
                    alt={name}
                    whileHover={{
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-2xl font-semibold whitespace-normal mt-6 tracking-wider">
                  {name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="">
        <h3 className="font-bold text-3xl text-center uppercase">
          This Season's Fire
        </h3>
        <nav className="flex gap-4 mb-8 ml-10 mt-7">
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
                (discount / 100) *
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
                          scale: showInset && insetIndex === i ? 1.1 : 1,
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
                      <p className="font-bold">{name}</p>
                    </Link>
                    <Link href="#" className="flex gap-2">
                      <p className="font-extrabold text-red-500">₦{newPrice}</p>
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
      </section>
    </section>
  );
};

export default HomePage;

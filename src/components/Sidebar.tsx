import { allProducts } from "@/app/data/products";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FaX } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

const Sidebar = ({ setIsOpen }) => {
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

  return (
    <motion.aside
      className="fixed text-black z-150 px-6 pt-5 py-8 bg-white top-0 right-0 h-screen md:w-7/20 w-full flex flex-col"
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
            <p className="text-gray-400 text-xs">Try different keywords</p>
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
  );
};
export default Sidebar;

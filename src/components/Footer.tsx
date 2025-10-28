import Link from "next/link";
import { FaAngleRight, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: ["200", "300", "400", "600", "800", "1000"],
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <footer
      className={`bg-[#C4C4C3] w-full py-16 sm:py-20 px-6 sm:px-10 md:px-20 ${nunito.className}`}
    >
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-12">
        {/* Newsletter */}
        <section className="flex-1 flex flex-col text-wrap">
          <p className="text-2xl sm:text-3xl mb-2 font-semibold tracking-wide">
            Subscribe to our Newsletter
          </p>
          <p className="text-sm sm:text-base mb-6 text-gray-800">
            Get the latest updates on new products & upcoming sales
          </p>

          <div className="relative flex items-center w-full mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-sm sm:text-base py-3 px-5 w-full rounded-xl outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
            />
            <button
              aria-label="Subscribe"
              className="absolute right-2 p-2 rounded-md text-gray-700 hover:bg-black hover:text-white transition-colors duration-300"
            >
              <FaAngleRight size={20} />
            </button>
          </div>

          <p className="text-xs sm:text-sm mb-3 text-gray-700">
            By subscribing, you agree to the{" "}
            <span className="underline cursor-pointer underline-offset-3">
              Terms of Use
            </span>{" "}
            &{" "}
            <span className="underline cursor-pointer underline-offset-3">
              Privacy Policy
            </span>
            .
          </p>
          <p className="text-xs sm:text-sm text-gray-800">
            Thomas Balogun Street, 202333 Lagos LA, Nigeria
          </p>
        </section>

        {/* Link Columns */}
        <div className="flex flex-wrap justify-between gap-4 flex-[1.5]">
          <section className="flex flex-col gap-2 min-w-[120px]">
            <p className="font-bold mb-2 text-black">Bendah Store</p>
            <Link href="#" className="hover:underline">
              About
            </Link>
            <Link href="#" className="hover:underline">
              Locations
            </Link>
          </section>

          <section className="flex flex-col gap-2 min-w-[140px]">
            <p className="font-bold mb-2 text-black">Contact</p>
            <Link href="#" className="hover:underline">
              FAQs
            </Link>
            <Link href="#" className="hover:underline">
              Shipping Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms & Conditions
            </Link>
          </section>

          <section className="flex flex-col gap-2 min-w-[120px]">
            <p className="font-bold mb-2 text-black">Shop</p>
            <Link href="#" className="hover:underline">
              Puma
            </Link>
            <Link href="#" className="hover:underline">
              Nike
            </Link>
            <Link href="#" className="hover:underline">
              Rombaut
            </Link>
            <Link href="#" className="hover:underline">
              Panama
            </Link>
            <Link href="#" className="hover:underline">
              Grunge
            </Link>
          </section>

          <section className="flex flex-col gap-2 min-w-[140px]">
            <p className="font-bold mb-2 text-black">Latest Edits</p>
            <Link href="#" className="hover:underline">
              Sports
            </Link>
            <Link href="#" className="hover:underline">
              Summer
            </Link>
            <Link href="#" className="hover:underline">
              Fashion
            </Link>
            <Link href="#" className="hover:underline">
              Lifestyle
            </Link>
            <Link href="#" className="hover:underline">
              Most Popular
            </Link>
            <Link href="#" className="hover:underline">
              New In
            </Link>
          </section>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10 border-gray-400" />

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Socials */}
        <div className="flex gap-5 text-gray-700">
          <FaFacebook
            size={25}
            className="cursor-pointer hover:text-blue-500"
          />
          <FaXTwitter size={25} className="cursor-pointer" />
          <FaInstagram
            size={25}
            className="cursor-pointer hover:text-purple-800"
          />
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-2 text-center justify-center sm:text-left">
          <p className=" tracking-wide font-semibold">
            &#169; 2025 Victor | Built with Next.js + Shopify&apos;s Storefront
            API
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

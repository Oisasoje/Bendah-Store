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
      className={`bg-[#C4C4C3] pt-20 pb-20 w-full h-full ${nunito.className}  px-15`}
    >
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
  );
};
export default Footer;

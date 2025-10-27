import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LazySwiper({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [SwiperLib, setSwiperLib] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);

        import("swiper/react").then((swiper) => {
          setSwiperLib(swiper);
        });
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!isVisible || !SwiperLib) {
    return (
      <div ref={ref} className="h-96 bg-gray-100 animate-pulse rounded">
        Loading carousel...
      </div>
    );
  }

  const { Swiper } = SwiperLib;

  return (
    <div ref={ref}>
      <Swiper
        key="rombaut-shoes-swiper"
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        navigation={true}
        className="my-swiper py-10"
      >
        {children}
      </Swiper>
    </div>
  );
}

import ProductItem from "@/components/products/ProductItem";
import productService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils1";
import { Metadata } from "next";
import CarouselBanner from "../../components/CarouselBanner";
import Review from "../../components/Reviews";
import { Maven_Pro } from "next/font/google";
import Problems from "@/components/heropage/Problems";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Lift Lock",
  description: process.env.NEXT_PUBLIC_APP_DESC || "Premium gym safety gear",
  icons: {
    icon: "/whitelogo.png",
  },
};

const headingFont = Maven_Pro({
  subsets: ["latin"],
  weight: ["500"],
});

export default async function Home() {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();
  console.log(latestProducts);
  console.log(process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  return (
    <div className="w-full max-w-[1700px] bg-background">
      <CarouselBanner />
      <div className="w-[90%] mx-auto h-auto mt-5">
        <Problems />
        <div className="text-center font-semibold my-5 py-5 flex flex-col gap-2">
          <h1 className="text-primary text-3xl md:text-4xl lg:text-4xl">Best Sellers</h1>
          <h2 className="text-md text-gray-400">Explore our best selling products</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-10">
          {latestProducts.map((product) => (
            <ProductItem
              key={product.slug}
              product={convertDocToObj(product)}
            />
          ))}
        </div>
      </div>

      <Review />
    </div>
  );
}

import productService from "@/lib/services/productService";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Rating } from "@/components/products/Rating";
import ClientSideProductDetails from "../SizeSelector";
import ImageSection from "../ImageSection";
import ModelViewer from "../ModelViewer";
import ViewProductButton from "../ViewProductButton";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return (
      <div className="w-full h-full justify-center items-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="w-[90%] max-w-[1200px] mb-16 mx-auto h-auto ">
      <div className="my-5">
        <Link href="/">
          <button className="flex gap-2 hover:text-zinc-600">
            <ArrowLeft />
            Back to Products
          </button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6 relative">
        {/* Images section */}
        <ImageSection product={product} />

        {/* Product details section */}
        <div className="mt-5 md:mt-0">
          <h1 className="">{product.brand}</h1>
          <h1 className="text-4xl font-bold mb-3">
            {product.name.toUpperCase()}
          </h1>
          <div className="flex items-center">
            <Rating
              value={product.rating}
              caption={`${product.numReviews} ratings`}
            />
            <ViewProductButton modelLink={product.modelLink ?? ""} />
          </div>

          <ClientSideProductDetails product={product} />

          <p className="text-gray-700 text-lg font-semibold mt-6">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/models/ProductModel";

type Props = {
  product: Product;
};

export default function ProductItem({ product }: Props) {
  return (
    <div className="bg-white transition-shadow w-full max-w-[350px]  group">
      <Link href={`/product/${product.slug}`}>
        <div className="relative w-full aspect-square">
          <Image
            src={product.image[0]}
            alt={product.name}
            fill
            className="object-cover  rounded-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="py-4">
      <Link href={`/product/${product.slug}`}>
          <h3 className="text-xl mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
            {product.name.toUpperCase()}
          </h3>
        </Link>
        <div className="flex items-center justify-between mb-2 ">
          <div className="flex items-end gap-3 text-2xl font-bold">
            ₹{product.price}
            <span className="line-through text-lg ">₹{product.prevPrice}</span>
          </div>
          <div className="flex items-center">
            <div className="flex gap-1 font-semibold text-lg items-center">
              5 <Star className="w-5 h-5 text-yellow-600 fill-yellow-500" />
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.numReviews} reviews)
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4 ">{product.brand}</p>
        <Link href={`/product/${product.slug}`}>
          <button className="w-full cartbutton text-white text-xl rounded-full duration-200 font-semibold py-4 flex items-center justify-center">
            <ShoppingCart className="mr-2 h-6 w-6" /> Add to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}
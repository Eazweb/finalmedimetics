'use client';

import useCartService from '@/lib/hooks/useCartStore';
import useWishlistService from '@/lib/hooks/useWishlist';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WishlistDetails() {
  const { items, removeFromWishlist } = useWishlistService();
  const { increase: addToCart } = useCartService();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className="max-w-[1300px] w-[90%] mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center text-xl">
          Wishlist is empty.{' '}
          <Link href="/" className="text-blue-500 underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item:any, index:any) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 border">
              <Link href={`/product/${item.slug}`}>
                <Image
                  src={item.image[0]}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg"
                />
              </Link>
              <div className="mt-4">
                <Link href={`/product/${item.slug}`}>
                  <h2 className="text-lg font-semibold line-clamp-1">
                    {item.name.toUpperCase()}
                  </h2>
                </Link>
                <p className="text-xl mt-2">₹{item.price}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => addToCart(item)}
                    className="btn bg-zinc-900 hover:bg-black text-white flex-1"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item)}
                    className="btn btn-outline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
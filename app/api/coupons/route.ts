// api/coupons/route.ts
export const dynamic = "force-dynamic"; // Add this line

import { NextRequest, NextResponse } from "next/server";
import Coupon from "@/lib/models/CouponModel";
import dbConnect from "@/lib/dbConnect";
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { message: "Coupon code is required" },
        { status: 400 }
      );
    }

    const coupon = await Coupon.findOne({
      code: { $regex: new RegExp(`^${code}$`, "i") },
    });

    if (coupon) {
      return NextResponse.json({
        coupon: {
          code: coupon.code,
          discountValue: coupon.discountValue,
        },
        message: "Coupon found",
      });
    } else {
      return NextResponse.json(
        { message: "Invalid coupon code" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching coupon:", error);
    return NextResponse.json(
      { message: "Failed to fetch coupon" },
      { status: 500 }
    );
  }
}

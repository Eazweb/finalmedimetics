import { auth } from "@/lib/auth";
import cloudinary from "cloudinary";
// app/api/cloudinary-sign/route.ts
export const runtime = 'nodejs'; // Force Node.js runtime

export const POST = auth(async (req: any) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.CLOUDINARY_SECRET!
  );

  return Response.json({ signature, timestamp });
}) as any;

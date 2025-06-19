import { NextRequest, NextResponse } from "next/server";
import User from '@/Models/userModel';
import connection from "@/lib/db";

export async function GET(req: NextRequest) {
  await connection();

  const userid = req.nextUrl.searchParams.get("userId");
  if (!userid) {
    console.log(Error,':error in user_id');
    alert('user not found');
     return NextResponse.json({ msg: 'user_id not find/valid', success: false, status: 400 })
  }

  const user = await User.findOne({ _id: userid });
  if (!user) {
    console.log(Error,':error in userId');
     alert('user not found');
      return NextResponse.json({ msg: 'user id not find', success: false, status: 400 })
  }

  user.isVerified = true;
  await user.save();

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login?Verfied=true`);
}



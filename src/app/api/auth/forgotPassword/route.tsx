import { NextResponse } from "next/server";
import User from "@/Models/userModel";
import mailer from "@/lib/nodeMailer";
import connection from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  await connection();

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const body = await req.json();
  const { email } = body;

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ msg: "Invalid email", success: false }, { status: 400 });
  }

  const existUser = await User.findOne({ email });
  if (!existUser) {
    return NextResponse.json({ msg: "User not found", success: false }, { status: 404 });
  }

  //  Generate JWT token valid for 1 hour
  const token = signToken({ id: existUser._id });


  const resetLink = `${process.env.NEXT_PUBLIC_API_BASE_URL}/resetPassword?access_token=${token}`;
  console.log("Reset link:", resetLink);

  const htmlContent = `
    <h2>Password Reset for ${email}</h2>
    <p>Click the button below to reset your password:</p>
    <a href="${resetLink}"  style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>If the button doesn't work, copy this link into your browser:</p>
    <p>${resetLink}</p>
  `;

  try {
    await mailer.sendMail(
      email,
      "Reset Your Password",
      htmlContent
    );

    return NextResponse.json({ msg: "Reset email sent successfully", success: true });
  } catch (error) {
    console.error("Error sending reset email:", error);
    return NextResponse.json({ msg: "Failed to send email", success: false }, { status: 500 });
  }
}

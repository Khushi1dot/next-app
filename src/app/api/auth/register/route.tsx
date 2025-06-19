import { NextResponse } from "next/server";
import User from '@/Models/userModel';
import bcrypt from 'bcryptjs';
import mailer from "@/lib/nodeMailer";
import connection from "@/lib/db";

export async function POST(req: Request) {

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  await connection();

  const body = await req.json();
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return NextResponse.json({ msg: 'invalid fields', success: false, status: 400 })
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ msg: "Invalid email format.", success: false, status: 400 });
  }

  if (!passwordRegex.test(password)) {
    return NextResponse.json({ msg: "Invalid password format", success: false, status: 400 });
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    return NextResponse.json({ msg: 'User already exist', success: false, status: 400 })
  }
  const hashPassword = await bcrypt.hash(password, 10);

  //  const verificationToken = crypto.randomBytes(32).toString('hex');
  try {
    const user = new User({ email, name, password: hashPassword });
    const result = await user.save();
    console.log(result, 'result');
return NextResponse.json({ msg: 'user created', success: true,result, status: 201 })
    // Verification link
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const verificationUrl = `${baseUrl}/api/auth/verify?userId=${user._id}`;
    console.log(verificationUrl, 'verificationUrl')
   
    // Construct email content
    const htmlContent = `
  <h2>Welcome to Digital Platform, ${name}!</h2>
  <p>Click the button below to verify your email:</p>
  <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
  <p>If the button doesn't work, open this link: <a href="${verificationUrl}">${verificationUrl}</a></p>
`;

    await mailer.sendMail(
      email,
      "Verify your email",
      htmlContent
    );
  } catch (error) {
    return NextResponse.json({ msg: error, success: false, status: 500 })
  }
  return NextResponse.json({ msg: 'user created', success: true, status: 201 })
}
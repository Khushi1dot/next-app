import { NextResponse } from "next/server";
import User from '@/Models/userModel';
import bcrypt from 'bcryptjs';
import { signToken } from "@/lib/auth";
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

  try {
    const user = new User({ email, name, password: hashPassword });
    const result = await user.save();
    console.log(result, 'result');
  } catch (error) {
    return NextResponse.json({ msg: error, success: false, status: 500 })
  }
  return NextResponse.json({ msg: 'user created', success: true, status: 201 })
}
import { NextResponse } from "next/server";
import User from '@/Models/userModel';
import bcrypt from 'bcryptjs';
import { signToken } from "@/lib/auth";
import connection from "@/lib/db";

export async function POST(req: Request) {

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    try {
        await connection();

        const body = await req.json();
        const { email, password } = body;
        if (!email || !password) {
            return NextResponse.json({ msg: 'invalid credentials', success: false, status: 400 })
        }

        if (!emailRegex.test(email)) {
            return NextResponse.json({ msg: 'invalid email format', success: false, status: 400 })
        }
        if (!passwordRegex.test(password)) {
            return NextResponse.json({ msg: "Invalid password format", success: false, status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ msg: 'invalid details', success: false, status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ msg: 'Invalid email or password', success: false, status: 400 });
        }
        let object = {
            id: user._id,
            email: user.email,
        }
        const token = signToken(object);
        // const token = jwt.sign({ name, email }, process.env.SECRET_KEY);
        const response = NextResponse.json({ msg: 'user login successfully', success: true, token,object, status: 201 });
        response.cookies.set('access_token', token,
            {
                // httpOnly: true,
                path: "/",
            }
        );
        response.cookies.set('isAuthenticated', "true");
        return response;
    } catch (error) {
        return NextResponse.json({ msg: error, success: false, status: 500 });
    }
}

import { NextResponse } from "next/server";
import User from "@/Models/userModel";
import bcrypt from "bcryptjs";
import connection from "@/lib/db";
import { verifyToken } from "@/lib/auth"; 
import { JwtPayload } from "jsonwebtoken";
export async function POST(req: Request) {
  await connection();

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const body = await req.json();
  const { password, confirmPassword, access_token } = body;

  if (!password || !confirmPassword || !access_token) {
    return NextResponse.json({ msg: "Missing fields", success: false }, { status: 400 });
  }

  if (!passwordRegex.test(password)) {
    return NextResponse.json({ msg: "Password does not meet criteria", success: false }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ msg: "Passwords do not match", success: false }, { status: 400 });
  }

  // Decode and verify the token
const decoded = verifyToken(access_token);
const decodedId= (decoded as JwtPayload & { id: string }).id;;
// If the token is not valid or doesn't have a user ID
if (!decoded || !decodedId) {
  return NextResponse.json({ msg: "Invalid or expired token", success: false }, { status: 401 });
}

// Get user ID from token
const userId = decodedId;

// Hash the new password
const hashedPassword = await bcrypt.hash(password, 10);

  try {
   // First, find the user by ID
const user = await User.findById(userId);

// If user is not found, return error
if (!user) {
  return NextResponse.json({ msg: "User not found", success: false }, { status: 404 });
}

// Update the password and save the user
user.password = hashedPassword;
await user.save();

return NextResponse.json({ msg: "Password reset successfully", success: true });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ msg: "Server error", success: false }, { status: 500 });
  }
}


// import { NextRequest, NextResponse } from "next/server";
// import { connect } from "@/dbconfig/dbconfig";
// import { User } from "@/models/userModel";
// import bcrypt from "bcryptjs";
 
// connect();
 
// export async function POST(request: NextRequest) {
//   try {
//     const { newPassword, confirmPassword } = await request.json();
 
   
//     if (!newPassword && !confirmPassword) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }
 
//     if (newPassword !== confirmPassword) {
//       return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
//     }
 
//     const token = request.nextUrl.searchParams.get("token");
//     console.log("Full URL:", request.nextUrl.href);
// console.log("Token:", token);
 
//     if (!token) {
//       return NextResponse.json({ error: "Token (user ID) is missing" }, { status: 400 });
//     }
 
 
//     const user = await User.findById({_id: token});
 
//     if (!user) {
//       return NextResponse.json({ error: "User not found or token is invalid" }, { status: 400 });
//     }
 
   
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
 
   
//     await user.save();
 
//     return NextResponse.json({ message: "Password has been reset successfully", success: true });
 
 
 
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
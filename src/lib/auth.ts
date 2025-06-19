import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY as string;


export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyToken(access_token: string) {
  try {
    return jwt.verify(access_token, SECRET);
  } catch {
    return null;
  }
}



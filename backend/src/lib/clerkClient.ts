import { Clerk } from "@clerk/clerk-sdk-node";
import 'dotenv/config';

export const clerkClient = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
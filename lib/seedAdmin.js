import bcrypt from "bcryptjs";
import { connectDB } from "./db.js";
import Admin from "../models/Admin.js";
import "dotenv/config";

export async function seedAdmin() {
  try {
    await connectDB();

    const email = "admin@aaravgift.com";
    const password = "Aarav@123";

    const exists = await Admin.findOne({ email });

    if (exists) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");
    console.log(`📩 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);

  } catch (err) {
    console.log("❌ Seed error:", err);
  }
}
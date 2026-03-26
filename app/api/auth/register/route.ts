import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import Recruiter from '@/models/Recruiter';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, password, fullName, companyName } = body;

    if (!email || !password || !fullName || !companyName) {
       return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await Recruiter.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const recruiter = await Recruiter.create({
      ...body,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'Recruiter created successfully', success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

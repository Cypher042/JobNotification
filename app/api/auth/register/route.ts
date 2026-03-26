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
    await Recruiter.create({
      ...body,
      password: hashedPassword,
    });

    const response = NextResponse.json({ message: 'Recruiter created successfully', success: true });
    response.cookies.set('auth_session', '1', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ message }, { status: 500 });
  }
}

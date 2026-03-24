import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    const newJob = new Job(data);
    await newJob.save();

    return NextResponse.json(
      { message: "Job details saved successfully", success: true }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving job details:", error);
    return NextResponse.json(
      { message: "Failed to save details", success: false, error }, 
      { status: 500 }
    );
  }
}

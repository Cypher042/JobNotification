import { NextResponse } from 'next/server';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Parser } from 'json2csv';
import Job from '@/models/Job';

// Ensure you have a MongoDB connection helper
import connectDB from '@/lib/mongodb';

type CsvJob = Record<string, unknown> & {
  selectedBtech?: string[];
  selectedIntMtech?: string[];
  selectedDual?: string[];
  selectedMtech?: string[];
  selectedMba?: string[];
  selectedMscTech?: string[];
  selectedMscJAM?: string[];
  placementSchedule?: Record<string, { modality?: string; date?: string }>;
};

export async function GET() {
  try {
    await connectDB();

    const jobs = (await Job.find({}).lean()) as CsvJob[];

    if (!jobs || jobs.length === 0) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    // Flatten nested fields like placementSchedule for CSV
    const csvData = jobs.map((job) => {
      
      const flatJob: Record<string, unknown> = {
        ...job,
        selectedBtech: job.selectedBtech?.join(', '),
        selectedIntMtech: job.selectedIntMtech?.join(', '),
        selectedDual: job.selectedDual?.join(', '),
        selectedMtech: job.selectedMtech?.join(', '),
        selectedMba: job.selectedMba?.join(', '),
        selectedMscTech: job.selectedMscTech?.join(', '),
        selectedMscJAM: job.selectedMscJAM?.join(', '),
      };

      // Flatten Placement Schedule Map
      if (job.placementSchedule) {
        Object.entries(job.placementSchedule).forEach(([round, details]) => {
          flatJob[`schedule_${round}_modality`] = details.modality;
          flatJob[`schedule_${round}_date`] = details.date;
        });
      }
      
      delete flatJob.placementSchedule;
      return flatJob;
    });

    const parser = new Parser();
    const csv = parser.parse(csvData);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="job_responses.csv"',
      },
    });

  } catch (error) {
    console.error("Export error", error);
    return NextResponse.json({ message: "Error exporting data" }, { status: 500 });
  }
}

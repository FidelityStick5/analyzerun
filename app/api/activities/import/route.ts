import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "papaparse";
import { Activity } from "@/types/globals";

const mapping: Record<keyof Omit<Activity, "id">, Array<string>> = {
  activity_type: ["Activity Type", "Typ aktywności"],
  date: ["Date", "Data"],
  favorite: ["Favourite", "Ulubiony"],
  title: ["Title", "Tytuł"],
  distance: ["Distance", "Dystans"],
  calories: ["Calories", "Kalorie"],
  time: ["Time", "Czas"],
  average_heart_rate: ["Avg HR", "Średnie tętno"],
  max_heart_rate: ["Max HR", "Maksymalne tętno"],
  average_cadence: ["Avg Cadence", "Średni rytm"],
  max_cadence: ["Max Cadence", "Maksymalny rytm"],
  average_pace: ["Average Pace", "Średnie tempo"],
  best_pace: ["Best Pace", "Najlepsze tempo"],
  total_ascent: ["Total Ascent", "Całkowity wznios"],
  total_descent: ["Total Descent", "Całkowity spadek"],
  average_stride_length: ["Avg Stride Length", "Średnia długość kroku"],
  average_vertical_ratio: [
    "Avg Vertical Ratio",
    "Średnie odchylenie do długości",
  ],
  average_vertical_oscillation: [
    "Avg Vertical Oscillation",
    "Średnie odchylenie pionowe",
  ],
  average_ground_contact_time: [
    "Avg Ground Contact Time",
    "Średni czas kontaktu z podłożem",
  ],
  training_stress_score: [
    "Training Stress Score®",
    "Training Stress Score® (TSS®)",
  ],
  grit: ["Grit", "Trudność"],
  flow: ["Flow", "Płynność"],
  average_swolf: ["Avg. Swolf", "Średni Swolf"],
  average_stroke_rate: ["Avg Stroke Rate", "Średnie tempo ruchów"],
  total_reps: ["Total Reps", "Razem powtórzeń"],
  min_temperature: ["Min Temp", "Minimalna temperatura"],
  decompression: ["Decompression", "Dekompresja"],
  best_lap_time: ["Best Lap Time", "Czas najlepszego okrążenia"],
  number_of_laps: ["Number of Laps", "Liczba okrążeń"],
  max_temperature: ["Max Temp", "Maksymalna temperatura"],
  moving_time: ["Moving Time", "Czas ruchu"],
  elapsed_time: ["Elapsed Time", "Upłynęło czasu"],
  min_elevation: ["Min Elevation", "Minimalna wysokość"],
  max_elevation: ["Max Elevation", "Maksymalna wysokość"],
};

const standardizeData = (data: Record<string, any>): Activity => {
  let resultActivity: Partial<Activity> = {
    id: randomUUID(),
  };

  for (const [key, value] of Object.entries(data)) {
    for (const [standardKey, localizedKeys] of Object.entries(mapping)) {
      if (!localizedKeys.includes(key)) continue;

      resultActivity[standardKey as keyof Activity] = value;
      break;
    }
  }

  return resultActivity as Activity;
};

const convertCSVtoJSON = (buffer: Buffer) => {
  const csvData = buffer.toString("utf-8").trim();

  const { data } = parse(csvData, {
    header: true,
    dynamicTyping: true,
    delimiter: ",",
  });

  const activites = data.map((unparsedActivity) =>
    standardizeData(unparsedActivity as Record<string, any>),
  );

  return activites;
};

async function POST(request: NextRequest) {
  const data = await request.formData();
  const blob = data.get("file") as Blob;

  if (blob.size === 0 || blob.size >= 1024 * 1024 * 5)
    return NextResponse.json(null, {
      status: 413,
      statusText: "Invalid size of the file",
    });

  const arrayBuffer = await blob.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  const convertedData = convertCSVtoJSON(fileBuffer);

  return NextResponse.json(convertedData, { status: 200, statusText: "OK" });
}

export { POST };

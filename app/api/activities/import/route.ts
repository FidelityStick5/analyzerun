import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "papaparse";
import { mapping } from "@/app/globals";
import getUser from "@/utils/getUser";
import { ActivitiesEndpoint } from "@/types/endpoints";
import { Activity } from "@/types/globals";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");
const client = new MongoClient(process.env.MONGODB_URI);

const standardizeData = (
  data: Record<string, any>,
  userId: ObjectId,
): Activity => {
  let resultActivity: Partial<Activity> = { userId };

  for (const [key, value] of Object.entries(data)) {
    for (const [standardKey, localizedKeys] of Object.entries(mapping)) {
      if (!localizedKeys.includes(key)) continue;

      resultActivity[standardKey as keyof Activity] = value;
      break;
    }
  }

  return resultActivity as Activity;
};

const convertCSVtoJSON = (
  buffer: Buffer,
  userId: ObjectId,
): Array<Activity> => {
  const csvData = buffer.toString("utf-8").trim();

  const { data } = parse(csvData, {
    header: true,
    dynamicTyping: true,
    delimiter: ",",
  });

  const activites = data.map((unparsedActivity) =>
    standardizeData(unparsedActivity as Record<string, any>, userId),
  );

  return activites;
};

async function POST(
  request: NextRequest,
): Promise<NextResponse<ActivitiesEndpoint.PostResponse>> {
  try {
    const { user } = await getUser();
    if (!user?.id)
      return NextResponse.json<ActivitiesEndpoint.PostResponse>(
        { message: "Unauthorized" },
        { status: 401 },
      );

    const data = await request.formData();
    const blob = data.get("file") as Blob;
    if (blob.size === 0 || blob.size >= 1024 * 1024 * 5)
      return NextResponse.json<ActivitiesEndpoint.PostResponse>(
        { message: "Invalid size of the file" },
        { status: 413 },
      );

    const arrayBuffer = await blob.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const convertedData = convertCSVtoJSON(
      fileBuffer,
      ObjectId.createFromHexString(user.id),
    );

    const { insertedCount, acknowledged } = await client
      .db("database")
      .collection("activities")
      .insertMany(convertedData);
    if (!acknowledged)
      return NextResponse.json<ActivitiesEndpoint.PostResponse>(
        { message: "Insert operation not acknowledged" },
        { status: 500 },
      );

    return NextResponse.json<ActivitiesEndpoint.PostResponse>(
      { data: convertedData, insertedCount, message: "OK" },
      { status: 201 },
    );
  } catch {
    return NextResponse.json<ActivitiesEndpoint.PostResponse>(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export { POST };

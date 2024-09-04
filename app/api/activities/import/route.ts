import { MongoClient, ObjectId, PushOperator } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "papaparse";
import { mapping } from "@/app/globals";
import getUser from "@/utils/getUser";
import { ActivitiesEndpoint } from "@/types/endpoints";
import { Activities, Activity } from "@/types/globals";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");
const client = new MongoClient(process.env.MONGODB_URI);

const standardizeData = (data: Record<string, any>): Activity => {
  let resultActivity: Partial<Activity> = { _id: new ObjectId() };

  for (const [key, value] of Object.entries(data)) {
    for (const [standardKey, localizedKeys] of Object.entries(mapping)) {
      if (!localizedKeys.includes(key)) continue;

      resultActivity[standardKey as keyof Activity] = value;
      break;
    }
  }

  return resultActivity as Activity;
};

const convertCSVtoJSON = (buffer: Buffer): Array<Activity> => {
  const csvData = buffer
    .toString("utf-8")
    .trim()
    .replace(/^[=+\-@]/, "'");

  const { data } = parse(csvData, {
    header: true,
    dynamicTyping: true,
    delimiter: ",",
  });

  const activities = data.map((unparsedActivity) =>
    standardizeData(unparsedActivity as Record<string, any>),
  );

  return activities;
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
    const blob = data.get("file");

    if (!(blob instanceof Blob) || blob.type !== "text/csv")
      return NextResponse.json<ActivitiesEndpoint.PostResponse>(
        { message: "Invalid file type" },
        { status: 422 },
      );

    if (blob.size === 0 || blob.size >= 1024 * 1024 * 5)
      return NextResponse.json<ActivitiesEndpoint.PostResponse>(
        { message: "Invalid size of the file" },
        { status: 413 },
      );

    const arrayBuffer = await blob.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const convertedData = convertCSVtoJSON(fileBuffer);

    const response = (await client
      .db("database")
      .collection("activities")
      .findOneAndUpdate(
        {
          userId: ObjectId.createFromHexString(user.id),
        },
        {
          $set: {
            userId: ObjectId.createFromHexString(user.id),
            timestamp: new Date().getTime(),
          },
          $push: {
            activities: { $each: convertedData },
          } as PushOperator<Document>,
        },
        { upsert: true, returnDocument: "after" },
      )) as Activities;

    if (!response)
      return NextResponse.json<ActivitiesEndpoint.PostResponse>(
        { message: "Coundn't insert activities" },
        { status: 500 },
      );

    if (!response._id)
      return NextResponse.json<ActivitiesEndpoint.PostResponse>(
        { message: "Couldn't retrieve id" },
        { status: 500 },
      );

    return NextResponse.json<ActivitiesEndpoint.PostResponse>(
      { data: response, message: "OK" },
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

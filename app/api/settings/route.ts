import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import getUser from "@/utils/getUser";
import { SettingsEndpoint } from "@/types/endpoints";
import { Settings } from "@/types/globals";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");
const client = new MongoClient(process.env.MONGODB_URI);

async function GET() {
  try {
    const { user } = await getUser();
    if (!user?.id)
      return NextResponse.json<SettingsEndpoint.GetResponse>(
        { message: "Unauthorized" },
        { status: 401 },
      );

    const data = (await client
      .db("database")
      .collection("settings")
      .findOne(
        {
          userId: ObjectId.createFromHexString(user.id),
        },
        { projection: { _id: 0, userId: 0 } },
      )) as Settings | null;

    if (!data)
      return NextResponse.json<SettingsEndpoint.GetResponse>(
        { message: "No settings found" },
        { status: 200 },
      );

    return NextResponse.json<SettingsEndpoint.GetResponse>(
      { data: data, message: "OK" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json<SettingsEndpoint.GetResponse>(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

async function PUT(
  request: NextRequest,
): Promise<NextResponse<SettingsEndpoint.PutResponse>> {
  try {
    const { user } = await getUser();
    if (!user?.id)
      return NextResponse.json<SettingsEndpoint.PutResponse>(
        { message: "Unauthorized" },
        { status: 401 },
      );

    const formData = await request.formData();

    const { modifiedCount } = await client
      .db("database")
      .collection("settings")
      .updateOne(
        { userId: ObjectId.createFromHexString(user.id) },
        {
          $set: {
            userId: ObjectId.createFromHexString(user.id),
            activitiesPerPage: parseInt(
              formData.get("activities-per-page") as string,
            ),
            age: parseInt(formData.get("age") as string),
            theme: formData.get("theme"),
          },
        },
        { upsert: true },
      );

    return NextResponse.json<SettingsEndpoint.PutResponse>(
      { updatedCount: modifiedCount, message: "OK" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json<SettingsEndpoint.PutResponse>(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export { GET, PUT };

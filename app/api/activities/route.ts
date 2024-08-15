import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import getUser from "@/utils/getUser";
import { ActivitiesEndpoint } from "@/types/endpoints";
import { Activity } from "@/types/globals";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");
const client = new MongoClient(process.env.MONGODB_URI);

async function GET(): Promise<NextResponse<ActivitiesEndpoint.GetResponse>> {
  try {
    const { user } = await getUser();
    if (!user?.id)
      return NextResponse.json<ActivitiesEndpoint.PostResponse>(
        { message: "Unauthorized" },
        { status: 401 },
      );

    const data = (await client
      .db("database")
      .collection("activities")
      .find({ userId: ObjectId.createFromHexString(user.id) })
      .toArray()) as Array<Activity>;
    await client.close();

    return NextResponse.json<ActivitiesEndpoint.GetResponse>(
      { data: data, message: "OK" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json<ActivitiesEndpoint.GetResponse>(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export { GET };

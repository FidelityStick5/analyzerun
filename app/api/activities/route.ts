import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import getUser from "@/utils/getUser";
import { ActivitiesEndpoint } from "@/types/endpoints";
import { Activities } from "@/types/globals";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");
const client = new MongoClient(process.env.MONGODB_URI);

async function GET(): Promise<NextResponse<ActivitiesEndpoint.GetResponse>> {
  try {
    const { user } = await getUser();
    if (!user?.name)
      return NextResponse.json<ActivitiesEndpoint.GetResponse>(
        { message: "Unauthorized" },
        { status: 401 },
      );

    const data = (await client
      .db("database")
      .collection("activities")
      .findOne(
        {
          userId: user.name,
        },
        { projection: { _id: 0, userId: 0 } },
      )) as Activities | null;

    if (!data || !data.activities)
      return NextResponse.json<ActivitiesEndpoint.GetResponse>(
        { message: "No activities found" },
        { status: 200 },
      );

    return NextResponse.json<ActivitiesEndpoint.GetResponse>(
      { data: data, timestamp: data.timestamp, message: "OK" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json<ActivitiesEndpoint.GetResponse>(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

async function DELETE(): Promise<
  NextResponse<ActivitiesEndpoint.DeleteResponse>
> {
  try {
    const { user } = await getUser();
    if (!user?.name)
      return NextResponse.json<ActivitiesEndpoint.DeleteResponse>(
        { message: "Unauthorized" },
        { status: 401 },
      );

    const data = await client
      .db("database")
      .collection("activities")
      .deleteOne({ userId: user.name });

    if (!data || data.deletedCount === 0)
      return NextResponse.json<ActivitiesEndpoint.DeleteResponse>(
        { message: "No activities found" },
        { status: 200 },
      );

    return NextResponse.json<ActivitiesEndpoint.DeleteResponse>(
      { deletedCount: data.deletedCount, message: "OK" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json<ActivitiesEndpoint.DeleteResponse>(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export { GET, DELETE };

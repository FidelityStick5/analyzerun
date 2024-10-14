import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import getUser from "@/utils/getUser";
import { ActivitiesEndpoint } from "@/types/endpoints";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");
const client = new MongoClient(process.env.MONGODB_URI);

async function DELETE(
  request: NextRequest,
): Promise<NextResponse<ActivitiesEndpoint.DeleteResponse>> {
  try {
    const { user } = await getUser();
    if (!user?.id)
      return NextResponse.json<ActivitiesEndpoint.DeleteResponse>(
        { message: "Unauthorized" },
        { status: 401 },
      );

    const { id } = await request.json();
    if (!id)
      return NextResponse.json<ActivitiesEndpoint.DeleteResponse>(
        { message: "No ID specified" },
        { status: 401 },
      );

    const data = await client
      .db("database")
      .collection("activities")
      .updateOne(
        { userId: ObjectId.createFromHexString(user.id) },
        {
          $pull: {
            activities: { _id: ObjectId.createFromHexString(id) } as any,
          },
        },
      );

    if (!data || data.modifiedCount === 0)
      return NextResponse.json<ActivitiesEndpoint.DeleteResponse>(
        { message: "No activities found" },
        { status: 200 },
      );

    return NextResponse.json<ActivitiesEndpoint.DeleteResponse>(
      { deletedCount: data.modifiedCount, message: "OK" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json<ActivitiesEndpoint.DeleteResponse>(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export { DELETE };

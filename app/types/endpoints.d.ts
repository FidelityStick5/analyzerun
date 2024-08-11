import { Activity } from "@/types/globals";

namespace ActivitiesEndpoint {
  type Data = { data: Array<Activity> };
  type Message = { message: string };
  type ResponseWrapper<ResponseType> = Partial<ResponseType> & Message;

  type GetResponse = ResponseWrapper<Data>;
  type PostResponse = ResponseWrapper<Data & { insertedCount: number }>;
  type PutResponse = ResponseWrapper<Data & { updatedCount: number }>;
  type DeleteResponse = ResponseWrapper<{ deletedCount: number }>;
}

import { Activities, Settings } from "@/types/globals";

type DataWrapper<DataType> = { data: DataType };
type Message = { message: string };
type ResponseWrapper<ResponseType> = Partial<ResponseType> & Message;

namespace ActivitiesEndpoint {
  type Data = DataWrapper<Activities>;
  type GetResponse = ResponseWrapper<Data & { timestamp?: number }>;
  type PostResponse = ResponseWrapper<Data>;
  type PutResponse = ResponseWrapper<{ updatedCount: number }>;
  type DeleteResponse = ResponseWrapper<{ deletedCount: number }>;
}

namespace SettingsEndpoint {
  type Data = DataWrapper<Settings>;
  type GetResponse = ResponseWrapper<Data>;
  type PostResponse = ResponseWrapper<Data>;
  type PutResponse = ResponseWrapper<{ updatedCount: number }>;
  type DeleteResponse = ResponseWrapper<{ deletedCount: number }>;
}

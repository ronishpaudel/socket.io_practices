import { API } from "@/app/api/API";
import { QueryFunction, useQuery } from "@tanstack/react-query";

export interface Tmessages {
  message: string[];
}

export const getMessagesKeys = {
  all: ["getMessages"] as const,
};

type TGetMessagesKey = typeof getMessagesKeys.all;

const fetchMessagesData: QueryFunction<
  Tmessages[],
  TGetMessagesKey
> = async () => {
  const response = await API.get("/api/messages");

  return response.data;
};

const useGetMessages = ({ ...rest } = {}) => {
  return useQuery({
    queryKey: getMessagesKeys.all,
    queryFn: fetchMessagesData,
    ...rest,
  });
};

export { useGetMessages };

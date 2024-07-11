// hooks/usePostMessages.ts
import { API } from "@/app/api/API";
import { useMutation } from "@tanstack/react-query";
import { Tmessages } from "./getMessages";

export const postMessagesKeys = {
  all: ["postMessages"] as const,
};

type TPostMessagesKey = typeof postMessagesKeys.all;

const mutateMessagesData = async (newMessage: string): Promise<Tmessages> => {
  const response = await API.post("/api/messages", { message: newMessage });
  return response.data;
};

const usePostMessages = () => {
  return useMutation<Tmessages, Error, string>({
    mutationKey: postMessagesKeys.all,
    mutationFn: mutateMessagesData,
  });
};

export { usePostMessages };

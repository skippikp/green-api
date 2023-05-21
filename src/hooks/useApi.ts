import axios from 'axios';
import { useAppSelector } from '../store';
import { RecievedMessage } from '../types';

const url = 'https://api.green-api.com/';

export const useApi = () => {
  const { user } = useAppSelector((store) => store.auth);

  const initUrl = (path: string, token?: string, idInstance?: string) => {
    return `${url}waInstance${ idInstance || user?.idInstance}/${path}/${token || user?.token}`;
  };

  const sendMessage = async (chatId: string, message: string) => {
    const result = await axios
      .post(initUrl('sendMessage'), {
        chatId,
        message,
      })
      .then((res) => res)
      .catch(console.error);

    return result;
  };

  const deleteNotification = async (receiptId: number) => {
    const result = await axios
      .delete(initUrl('DeleteNotification') + "/" + receiptId)
      .then((data) => data)
      .catch(console.error);

    return result;
  };

  const receiveNotification = async () => {
    const result = await axios.get(initUrl('ReceiveNotification'))
      .then(async (data: { data: RecievedMessage | null }) => {
        if (data.data) {
          return await deleteNotification(data.data.receiptId).then(() => {
            return data.data?.body;
          });
        } else return;
      })
      .catch(console.error);

    return result;
  };

  const checkAccount = async (token: string, idInstance: string) => {
    const result = await axios.get(initUrl('getStateInstance', token, idInstance))
      .then((data) => data.data);

      return result;
  }

  return { sendMessage, receiveNotification, checkAccount };
};

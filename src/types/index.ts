export type RecievedMessage = {
  receiptId: number;
  body: RecievedMessageBody;
};

export type RecievedMessageBody = {
  typeWebhook: string;
  instanceData: InstanceData;
  timestamp: number;
  idMessage: string;
  senderData: SenderData;
  messageData?: MessageData;
};

export type InstanceData = {
  idInstance: number;
  wid: string;
  typeInstance: string;
};

export type SenderData = {
  chatId: string;
  sender: string;
  senderName: string;
};

export type MessageData = {
  typeMessage: string;
  textMessageData?: {
    textMessage: string;
  };
  extendedTextMessageData?: ExtendedMessageData;
};

export type ExtendedMessageData = {
  description: string;
  jpegThumbnail:string;
  previewType:string;
  text: string;
  title: string;
};

export type Message = {
  sender: string;
  text: string;
  timestamp: number;
};
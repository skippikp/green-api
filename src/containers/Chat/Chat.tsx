import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useApi } from '../../hooks/useApi';
import { useAppSelector } from '../../store';
import { Message as MessageType, RecievedMessageBody } from '../../types';
import{ Message } from '../../components';
import Avatar from '../../icons/Avatar';
import ChatInput from './components/ChatInput/ChatInput';

import './Chat.scss';

const Chat = () => {
  const { chatId } = useAppSelector((store) => store.chat);
  const { receiveNotification } = useApi();
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    let ignore = false;
    let timer: NodeJS.Timeout | null = null;
    setMessages([]);

    async function subscribe() {
      if (!ignore && chatId) {
        try {
          const data = await receiveNotification();
          if (data && data.senderData.sender === chatId) {
            setMessages((prev) => [formatMessage(data), ...prev]);
          }
          await subscribe();
        } catch (e) {
          timer = setTimeout(() => subscribe(), 500);
        }
      }
    }

    subscribe();

    return () => {
      ignore = true;
      if (timer) {
        clearTimeout(timer);
      }
    };
    //eslint-disable-next-line
  }, [chatId]);

  const formatMessage = (data: RecievedMessageBody) => {
    return {
      sender: data.senderData.sender,
      text: data.messageData?.textMessageData?.textMessage || '',
      timestamp: data.timestamp * 1000,
    };
  };

  const handleSendMessages = (message: string) => {
    const formatedMessage: MessageType = {
      sender: 'me',
      text: message,
      timestamp: Date.now(),
    };
    setMessages((prev) => [formatedMessage, ...prev]);
  };

  return chatId ? (
    <div className="chat">
      <header className="chat__header">
        <div className="chat__header__avatar">
          <Avatar />
        </div>
        <div>
          <span>{'+' + chatId.split('@')[0]}</span>
        </div>
      </header>
      <div className="chat__bg"></div>
      <div className="chat__messages-container">
        <div className="chat__messages__list">
          <div className="chat__top-space"></div>
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={clsx(
                'message-container',
                messages[idx + 1] && messages[idx + 1]?.sender !== message.sender && 'mt-2'
              )}
            >
              <Message message={message} type={message.sender === chatId ? 'recieved' : 'sended'} />
            </div>
          ))}
        </div>
      </div>
      <footer className="chat__footer">
        <ChatInput onSend={handleSendMessages} />
      </footer>
    </div>
  ) : (
    <div className="chat chat__placeholder">
      <div className="chat__bg"></div>
      <span>Начните диалог с пользователем</span>
    </div>
  );
};

export default Chat;

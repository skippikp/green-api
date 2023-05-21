import React, { useRef, useState } from 'react';
import { useApi } from '../../../../hooks/useApi';
import { useAppSelector } from '../../../../store';
import SendIcon from '../../../../icons/SendIcon';

import './ChatInput.scss';

type Props = {
  onSend: (message: string) => void;
};

const ChatInput = ({ onSend }: Props) => {
  const { chatId } = useAppSelector((store) => store.chat);
  const { sendMessage } = useApi();
  const [inputValue, setInputValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSendMessage = () => {
    if (chatId && inputValue) {
      sendMessage(chatId, inputValue);
      onSend(inputValue);
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '40px';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 1 + 'px';
    }
  };

  return (
    <div className="chat__input">
      <textarea
        ref={textareaRef}
        value={inputValue}
        onKeyDown={handleKeyPress}
        onInput={handleResize}
        onChange={handleChange}
        placeholder="Введите сообщение"
      />
      <div className="chat__input__icon" onClick={handleSendMessage}>
        <SendIcon />
      </div>
    </div>
  );
};

export default ChatInput;

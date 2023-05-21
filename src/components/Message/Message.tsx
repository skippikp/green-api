import React from 'react';
import clsx from 'clsx';
import { Message as MessageType } from '../../types';
import { getTime } from '../../utils/date';

import './Message.scss';

type Props = {
  message: MessageType;
  type: 'recieved' | 'sended';
};

export const Message = ({ message, type }: Props) => {
  return (
    <div
      className={clsx(
        'message__box',
        type === 'recieved' ? 'message__box_left' : 'message__box_right'
      )}
    >
      <span className="message__content">
        {message.text}
        <span>{getTime(message.timestamp)}</span>
      </span>
      <span className="message__time">{getTime(message.timestamp)}</span>
    </div>
  );
};

export default Message;

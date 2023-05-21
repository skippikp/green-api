import React, { useState } from 'react';
import clsx from 'clsx';
import { useAppDispatch } from '../../store';
import { setChatId } from '../../store/chatSlice';
import MessageIcon from '../../icons/MessageIcon';
import Avatar from '../../icons/Avatar';

import './Contacts.scss';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);

  const startChat = () => {
    if (!Number.isNaN(Number(phoneNumber)) && phoneNumber.length >= 6) {
      dispatch(setChatId(phoneNumber.replace(/\D/g, '')));
      setPhoneNumber('');
    } else {
      setInputError(true);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError(false);
    setPhoneNumber(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      startChat();
    }
  };

  return (
    <section className="contacts-container">
      <header className="contacts__header">
        <div className="contacts__header__avatar">
          <Avatar />
        </div>
      </header>
      <div className="input-container">
        <div className="input-container__search-input">
          <input
            className={clsx(inputError && 'input_error')}
            value={phoneNumber}
            onChange={handleChangeInput}
            onKeyDown={handleKeyPress}
            placeholder="Новый чат"
          />
          <div className="message-icon" title="Начать чат" onClick={startChat}>
            <MessageIcon />
          </div>
        </div>
      </div>
      <div className="contacts">
        <div></div>
      </div>
    </section>
  );
};

export default Contacts;

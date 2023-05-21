import React, { useState } from 'react';
import { useApi, useAuth } from '../../hooks';
import { Button, ErrorAlert } from '../../components';

import './LoginForm.scss';

const LoginForm = () => {
  const [idField, setIdField] = useState<string>('');
  const [tokenField, setTokenField] = useState<string>('');
  const [authError, setAuthError] = useState<Error | undefined>();
  const [authUser] = useAuth();
  const { checkAccount } = useApi();

  const handleAuthUser = () => {
    if (tokenField && idField) {
      setAuthError(undefined);
      checkAccount(tokenField, idField)
        .then((data) => {
          if (data && data.stateInstance === 'authorized') {
            authUser(idField, tokenField);
          } else {
            setAuthError(new Error('Аккаунт не авторизован'));
          }
        })
        .catch((e) => {
          setAuthError(e);
        });
    }
  };

  return (
    <div className="login-form">
      <h5>Пожалуйста авторизуйтесь</h5>
      <div className="login-form__inputs-container">
        <label>Введите idInstance</label>
        <input value={idField} onChange={(e) => setIdField(e.target.value)} />
        <label>Введите apiTokenInstance</label>
        <input value={tokenField} onChange={(e) => setTokenField(e.target.value)} />
      </div>
      <ErrorAlert error={authError} />
      <Button onClick={handleAuthUser}>Вход</Button>
    </div>
  );
};

export default LoginForm;

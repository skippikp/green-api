import React from 'react';
import './ErrorAlert.scss';

type Props = {
  error?: Error;
};

export const ErrorAlert = ({ error }: Props) => {
  return error ? (
    <div className="error_alert">
      <span>{error.message}</span>
    </div>
  ) : null;
};

export default ErrorAlert;

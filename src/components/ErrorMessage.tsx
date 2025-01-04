import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-center text-xl text-red-500">
      <p>Error: {message}</p>
    </div>
  );
};

export default ErrorMessage;
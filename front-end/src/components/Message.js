import React, { useState } from 'react';

const Message = ({ title, greeting }) => {
  const [showMessage, setShowMessage] = useState(true);

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <div className='mt-10'>
      {showMessage && (
        <>
          {title === 'success' ? (
            <div className="bg-green-400">
              <p className='text-gray-200'>{`${title}!: ${greeting}`}</p>
              <button onClick={handleCloseMessage} className="bg-red-800 text-white">
                Close
              </button>
            </div>
          ) : title === 'info' ? (
            <div className="bg-yellow-500">
              <p className='text-gray-200'>{`${title}!: ${greeting}`}</p>
              <button onClick={handleCloseMessage} className="bg-red-800 text-white">
                Close
              </button>
            </div>
          ) : (
            <div className="bg-red-400">
              <p className='text-red-600'>{`${title}!: ${greeting}`}</p>
              <button onClick={handleCloseMessage} className="bg-red-800 text-white">
                Close
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Message;

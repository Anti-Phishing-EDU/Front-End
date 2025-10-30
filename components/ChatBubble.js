import React from 'react';

const ChatBubble = ({ text, isBot }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: isBot ? 'flex-start' : 'flex-end',
      marginBottom: '10px',
    }}
  >
    <div
      style={{
        maxWidth: '75%',
        backgroundColor: isBot ? '#eeeeee' : '#7e57c2',
        color: isBot ? '#000' : '#fff',
        padding: '10px 14px',
        borderRadius: '16px',
        borderTopLeftRadius: isBot ? '0' : '16px',
        borderTopRightRadius: isBot ? '16px' : '0',
        wordWrap: 'break-word',
      }}
    >
      {text}
    </div>
  </div>
);

export default ChatBubble;
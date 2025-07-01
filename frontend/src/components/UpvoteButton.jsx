import React from 'react';

const UpvoteButton = ({ count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
    >
      👍 {count}
    </button>
  );
};

export default UpvoteButton;

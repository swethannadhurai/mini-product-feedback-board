import React from 'react';
import StatusBadge from './StatusBadge';
import UpvoteButton from './UpvoteButton';
import API from '../services/api';


const FeedbackCard = ({ feedback, onUpvote }) => {
  const handleUpvote = async () => {
    try {
      const res = await fetch(`https://mini-product-feedback-board.onrender.com/feedbacks/${feedback._id}/upvote`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });


      const data = await res.json();
      onUpvote(data);
    } catch (err) {
      console.error('Upvote failed:', err);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold">{feedback.title}</h2>
          <p className="text-sm text-gray-600">{feedback.description}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="bg-gray-200 px-2 py-1 rounded">{feedback.category}</span>
             {localStorage.getItem('isAdmin') === 'true' ? (
             <select
                 className="border px-2 py-1 rounded text-xs"
                 value={feedback.status}
                 onChange={async (e) => {
                 try {
                   const res = await API.patch(`/feedbacks/${feedback._id}/status`, {
                   status: e.target.value,
                 });
                 
                 onUpvote(res.data); 
                } catch (err) {
                    console.error('Status update failed', err);
                 }
            }}
         >
         <option>Open</option>
         <option>Planned</option>
         <option>In Progress</option>
         <option>Done</option>
       </select>
      ) : (
     <StatusBadge status={feedback.status} />
    )}

          </div>
        </div>
        <div className="sm:ml-4 text-center sm:text-right">
          <UpvoteButton count={feedback.upvotes} onClick={handleUpvote} />
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;





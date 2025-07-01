const express = require('express');
const router = express.Router();
const {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  upvoteFeedback,
  updateStatus,
  addComment
} = require('../controllers/feedbackController');

router.get('/', getAllFeedbacks);
router.get('/:id', getFeedbackById);
router.post('/', createFeedback);
router.patch('/:id/upvote', upvoteFeedback);
router.patch('/:id/status', updateStatus);
router.post('/:id/comments', addComment);


module.exports = router;

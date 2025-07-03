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
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getAllFeedbacks);
router.get('/:id', getFeedbackById);
router.post('/', createFeedback);
router.patch('/:id/upvote', upvoteFeedback);

router.post('/:id/comments', addComment);

router.patch('/:id/status', protect, adminOnly, updateStatus);


module.exports = router;

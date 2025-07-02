const Feedback = require('../models/Feedback');

// GET /feedbacks - Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error('Error getting feedbacks:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /feedbacks/:id - Get single feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (err) {
    console.error('Error fetching feedback:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /feedbacks - Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = new Feedback({
      title,
      description,
      category,
    });

    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    console.error('Error creating feedback:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// PATCH /feedbacks/:id/upvote - Increment upvotes
exports.upvoteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    feedback.upvotes += 1;
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.error('Upvote error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// PATCH /feedbacks/:id/status - Update status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Open', 'Planned', 'In Progress', 'Done'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.json(feedback);
  } catch (err) {
    console.error('Status update error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /feedbacks/:id/comments - Add a comment
exports.addComment = async (req, res) => {
  const { name, message } = req.body;

  
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  try {
    // Find the feedback by ID
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    // Push new comment to the array
    feedback.comments.push({ name, message });
    await feedback.save();

    // Respond with updated feedback
    res.status(201).json(feedback);
  } catch (err) {
    console.error('Add comment error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
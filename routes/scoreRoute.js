const express = require('express');
const { handleUpdateScore, handleUserScore } = require('../controllers/score');
const router = express.Router();

// update the score route
router.post('/update-score', handleUpdateScore);

// get scores using user id route
router.get('/:userId', handleUserScore);

module.exports = router;
const express = require('express');
const { handleUpdateScore, handleUserScore } = require('../controllers/score');
const router = express.Router();

router.post('/update-score', handleUpdateScore);

router.get('/:userId', handleUserScore);

module.exports = router;
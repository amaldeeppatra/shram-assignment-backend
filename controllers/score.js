const User = require('../models/user');

// function to update the score
async function handleUpdateScore(req, res){
  const { userId, score } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    user.pastScores.push(score);
    if (score > user.highScore) {
      user.highScore = score;
    }
    await user.save();
    res.json({ highScore: user.highScore });
  } catch (error) {
    res.status(500).send('Server error');
  }
}


// function to get high score and past scores using user id
async function handleUserScore(req, res){
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({
      highScore: user.highScore,
      pastScores: user.pastScores
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Server error');
  }
}


module.exports = {
    handleUpdateScore,
    handleUserScore
}
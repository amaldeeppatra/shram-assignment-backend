const User = require('../../models/user');

async function handleLogin(req, res){
  const { username, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(username, password);
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({
      userId: user._id,
      token,
      username
    });
  } catch (error) {
    res.status(400).json({ msg: 'Invalid credentials' });
  }
}

module.exports = { handleLogin };
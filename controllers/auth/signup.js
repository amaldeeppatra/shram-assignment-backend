const User = require('../../models/user');

async function handleSignup(req, res){
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
        return res.status(400).json({ error: "Username is already taken" });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
}

module.exports = { handleSignup };
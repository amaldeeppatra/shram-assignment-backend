const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        sparse: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    highScore: {
        type: Number,
        default: 0
    },
    pastScores: {
        type: [Number],
        default: []
    }
}, { timestamps: true });

// hashing the password before storing in DB
userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

// unhashing the password for checking whether correct
userSchema.static("matchPasswordAndGenerateToken", async function (username, password) {
    const user = await this.findOne({ username });
    if (!user) throw new Error("User not found!");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    if (hashedPassword !== userProvidedHash) throw new Error("Incorrect Password");
    const token = createTokenForUser(user);
    return token;
});

const User = model("User", userSchema);

module.exports = User;
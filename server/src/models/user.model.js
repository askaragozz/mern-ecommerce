import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: [50, "Username cannot exceed 50 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long"]
    },
    role: {
        type: String,
        required: true,
        enum: ["customer", "admin"],
        default: "customer",
        index: true
    },
    refreshTokenHash: {
        type: String,
        default: null
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) next();

    try {
        const passwordHash = bcrypt.hashSync(this.password, 10);
        this.password = passwordHash;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }

});

export default User;
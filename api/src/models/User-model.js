import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        email_verified: { type: Boolean, default: false },
        password: { type: String, required: true },
        phone: { type: String },
        role: {
            type: String,
            enum: ['patient', 'therapist', 'user', 'Admin'],
            required: true,
        },
        medical_record: { type: String, unique: true, required: true },
        policy_accepted: { type: Boolean, required: true },
        reset_password_token: { type: String },
        login_token: { type: Number },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

//Middleware
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
        } catch (error) {
            next(error);
        }
    }
    next();
})

//Methods
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

userSchema.methods.changePassword = async function (new_password) {
    try {
        this.password = new_password;
        await this.save();
    } catch (error) {
        throw error;
    }
}

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.reset_password_token;
    delete user.login_token;
    return user;
}

export const User = model('User', userSchema);

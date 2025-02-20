//Import tools
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

//Define the interface
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    email_verified: boolean;
    password: string;
    phone: string;
    role: string;
    medical_record: string;
    policy_accepted: boolean;
    reset_password_token: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
    changePassword: (password: string) => Promise<void>;
    verificateEmail: () => Promise<void>;
}

//Define the schema
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
    },
    {
        timestamps: true,
    }
);

//Encrypt the password
userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        return next();
    } catch (error) {
        console.log(error);
        throw new Error('Error while encrypting the password');
    }
});

//Compare the password
userSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

//Change the password
userSchema.methods.changePassword = async function (
    password: string
): Promise<void> {
    this.password = password;
    await this.save();
};

//Verificate the email
userSchema.methods.verificateEmail = async function (): Promise<void> {
    this.email_verified = true;
    await this.save();
};

//Export User without sensitive data
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.reset_password_token;
    return user;
};

//Export the model
export const User_model = model<IUser>('User', userSchema);

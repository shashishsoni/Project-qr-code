import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Signup model
export interface ISignup extends Document {
    username: string;
    email: string;
    password: string;
    signupDate: Date;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
}

// Create the Signup schema
const SignupSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure username is unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },
    signupDate: {
        type: Date,
        default: Date.now, // Set default to current date and time
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

// Create the Signup model
const Signup = mongoose.model<ISignup>('Signup', SignupSchema);

export default Signup;

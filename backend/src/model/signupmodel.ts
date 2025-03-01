import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Signup model
export interface ISignup extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    signupDate: Date;
}

// Create the Signup schema
const SignupSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
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
});

// Create the Signup model
const Signup = mongoose.model<ISignup>('Signup', SignupSchema);

export default Signup;

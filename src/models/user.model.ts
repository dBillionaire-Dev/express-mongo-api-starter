import mongoose, { Model, Document, Schema, } from "mongoose";

//Defining the interface for the model structure
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin",
    createdAt: Date;
    updatedAt: Date;
}

//Defining the Model Schema
const UserSchema: Schema<IUser> = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, {
    //This automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true,
})

//Creating the model
const User: Model<IUser> = mongoose.model<IUser> ("User", UserSchema);

//Export User Model
export default User;
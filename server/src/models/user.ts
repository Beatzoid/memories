import mongoose from "mongoose";

import { User } from "../types/user";

const user = new mongoose.Schema<User>(
    {
        id: { type: String },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("users", user);

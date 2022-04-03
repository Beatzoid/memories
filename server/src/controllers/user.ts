import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import User from "../models/user";

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await argon2.verify(user.password, password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid login" });

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET!
        );

        return res.json({ result: user, token });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const signup = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user)
            return res.status(400).json({ message: "User already exists" });

        if (password !== confirmPassword)
            return res.status(400).json({ msg: "Passwords don't match" });

        const hashedPassword = await argon2.hash(password, { saltLength: 12 });

        const result = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { email: result.email, id: result._id },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        return res.json({ result, token });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

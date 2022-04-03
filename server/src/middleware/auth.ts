import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]!;
        // If token.length < 500, it means that its an
        // email and password login. Otherwise, it's a Google login
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as JwtPayload;

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub as string;
        }

        next();
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

export default auth;

import { z } from 'zod';
import User from '../models/user.model.js';

const searchQuerySchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export const searchUser = async (req, res) => {
    try {
        const validationResult = searchQuerySchema.safeParse(req.query);
        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.issues[0].message });
        }
        const { email } = validationResult.data;
        const foundUser = await User.findOne({ email: email });
        if (!foundUser) {
            return res.status(404).json({ message: "Phew! Your partner is not on the list." });
        }
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(500).json({ error: "An unexpected server error occurred." });
    }
};
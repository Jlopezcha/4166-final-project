import { getAllUsers } from "../services/userService.js";
import jwt from 'jsonwebtoken';


export async function getAllUsersHandler(req, res) {
    const users = await getAllUsers();
    res.status(200).json(users);
}

export async function getCurrentUser(req, res) {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.decode(token);
        res.status(200).json(decodedToken);
    } catch (error) {
        res.status(404);
    }

}
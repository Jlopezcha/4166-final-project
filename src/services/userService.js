import { findAllUsers } from "../repositories/userRepo.js";

export async function getAllUsers() {
    return findAllUsers();
}

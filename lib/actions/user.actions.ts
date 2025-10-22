'use server';

import {connectToDatabase} from "@/database/mongoose";

export const getAllUsersForNewsEmail = async () => {
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if(!db) throw new Error('Mongoose connection not connected');
        // Some auth adapters (Better Auth) store users in a 'user' collection (singular).
        // Try the singular collection first, then fall back to 'users'. This avoids
        // returning an empty list when the app's auth provider uses a different name.
        const collectionsToTry = ['user', 'users'];
        let rawUsers: Array<{ _id?: any; id?: string; email?: string; name?: string }> = [];
        let usedCollection: string | null = null;

        for (const colName of collectionsToTry) {
            try {
                const found = (await db.collection(colName).find(
                    { email: { $exists: true, $ne: null } },
                    { projection: { _id: 1, id: 1, email: 1, name: 1, country: 1 } }
                ).toArray()) as Array<{ _id?: any; id?: string; email?: string; name?: string }>;

                if (found && found.length > 0) {
                    rawUsers = found;
                    usedCollection = colName;
                    break;
                }
            } catch {
                    // ignore and try next collection name
                }
        }

        if (!rawUsers || rawUsers.length === 0) {
            // No users found in any of the expected collections
            return [];
        }

    // Log which collection returned results to aid debugging in prod
    console.info('[getAllUsersForNewsEmail] using collection', usedCollection, 'returned', rawUsers.length, 'users');

        return rawUsers
            .filter((user) => user && user.email && user.name)
            .map((user) => ({ id: user.id || (user._id ? String(user._id) : ''), email: user.email as string, name: user.name as string }));
    } catch (e) {
        console.error('Error fetching users for news email:', e)
        return []
    }
}


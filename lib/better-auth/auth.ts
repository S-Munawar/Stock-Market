import {betterAuth} from 'better-auth';
import {mongodbAdapter} from 'better-auth/adapters/mongodb';
import {connectToDatabase} from '@/database/mongoose';
import {nextCookies} from 'better-auth/next-js';

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
    if (authInstance) {
        return authInstance;
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if(!db) throw new Error('Database connection is not established');

    authInstance = betterAuth({
        database: mongodbAdapter(db as any), // Type assertion to any to bypass type issues
        secret : process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_BASE_URL || 'http://localhost:3000',
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 6,
            maxPasswordLength: 100,
            autoSignIn: true,
        },
        plugins: [nextCookies()],
    });

    return authInstance;
}

export const auth = await getAuth();
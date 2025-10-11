import {connectToDatabase} from './mongoose';

// Note: this script does not load .env automatically. Either set MONGODB_URI
// in your environment or run the script with dotenv (install dotenv) if you
// want .env loading.

async function main() {
    try {
        const db = await connectToDatabase();
        console.log('Connected to Test Database');
        process.exit(0); // Exit the process with success code
    } catch (error) {
        console.error('Error connecting to Test Database:', error);
        process.exit(1); // Exit the process with failure code
    }
}

main();
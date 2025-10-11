import {Inngest} from "inngest";

export const inngest = new Inngest({
    id: process.env.INNGEST_ID!,
    ai: {gemini: {apiKey: process.env.GEMINI_API_KEY!}},
});


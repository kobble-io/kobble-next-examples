'use server'

import axios from 'axios';
import { Kobble } from '@kobbleio/admin';
import { getAuth } from '@kobbleio/next/server';

export async function generateImage(prompt: string) {
    if (!process.env.DEZGO_API_KEY) {
        throw new Error('DEZGO_API_KEY is not set. Please set it in your environment variables. You can get it from https://dezgo.com/');
    }

    if (!process.env.KOBBLE_SDK_SECRET_KEY) {
        throw new Error('KOBBLE_SDK_SECRET_KEY is not set. Please set it in your environment variables.');
    }

    const { session } = await getAuth();

    if (!session) {
        throw new Error('You must be logged in to use this feature');
    }

    const kobble = new Kobble(process.env.KOBBLE_SDK_SECRET_KEY);

    const isAllowed = kobble.users.hasRemainingQuota(session.user.id, 'image-generated');

    if (!isAllowed) {
        throw new Error('You have reached your image generation quota. Please upgrade your plan to generate more images.');
    }

    const response = await axios.post(
        'https://api.dezgo.com/text2image',
        {
            prompt,
            width: 320,
            height: 320,
            model: '0001softrealistic_v187'
        },
        {
            responseType: 'arraybuffer',
            headers: {
                'x-dezgo-key': process.env.DEZGO_API_KEY
            }
        }
    );

    await kobble.users.incrementQuotaUsage(session.user.id, 'image-generated')

    return response.data as ArrayBuffer;
}
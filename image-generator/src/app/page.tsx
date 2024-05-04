'use client'

import { Card } from '@/app/components/Card';
import DemoImage from '@/app/assets/img/demo-image.jpeg';
import { Heading } from '@/app/components/Heading';
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import { SignedIn, SignedOut, LoginButton, LogoutButton, useAuth, IsAllowed, IsForbidden } from '@kobbleio/next/client';
import { useState } from 'react';
import { ImageCard } from '@/app/components/ImageCard';
import { LoadingFrame } from '@/app/components/LoadingFrame';
import { GithubLink } from '@/app/components/GithubLink';
import { QuotaUsage } from '@/app/components/QuotaUsage';
import { generateImage } from '@/app/actions'

type ImageResult = { id: number; url: string };

const Home = () => {
    const [images, setImages] = useState<ImageResult[]>([]);
    const [prompt, setPrompt] = useState<string>('A cat in the forest');
    const [isCreating, setIsCreating] = useState(false);

    const scrollTop = () => {
        window.scrollTo(0, 0);
    };


    const genImage = async () => {
        setIsCreating(true);
        try {
            const imageBuffer = await generateImage(prompt);
            const uint8 = new Uint8Array(imageBuffer)
            const image = new Blob([uint8], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(image);
            setImages([{
                id: Date.now(),
                url: imageUrl
            }, ...images]);
            scrollTop();
        } catch (e) {
            console.log('An error occurred while generating image', e);
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <div className="flex flex-col justify-between items-center w-full pb-20">
            <SignedIn>
                <header className={'fixed top-0 right-0 left-0 h-[50px] p-10 flex items-center justify-end gap-2'}>
                    <GithubLink />
                    <LogoutButton>
                        <Button>Logout</Button>
                    </LogoutButton>
                    <QuotaUsage />
                </header>
                <main className="py-20">
                    <Heading />

                    {isCreating && <LoadingFrame text={'Generating image...'} />}

                    {images?.map((image) => <ImageCard key={image.id} url={image.url} />)}
                </main>
                <div className={'fixed bottom-0 right-0 left-0 h-40 flex items-center justify-center'}>
                    <Card className="overflow-x-scroll w-[500px]">
                        <div className={'flex gap-2 items-center'}>
                            <Input
                                placeholder={'Type your prompt...'}
                                onInput={(event) => {
                                    const target = event.target as HTMLInputElement;
                                    setPrompt(target.value);
                                }}
                            />
                            <LoginButton>
                                <Button>Sign in to generate</Button>
                            </LoginButton>
                            <IsAllowed quota={'image-generated'}>
                                <Button onClick={genImage}>Generate image</Button>
                            </IsAllowed>
                            <IsForbidden quota={'image-generated'}>
                                <span>You've reach your image generation quota</span>
                            </IsForbidden>
                        </div>
                    </Card>
                </div>
            </SignedIn>

            <SignedOut>
                <header className={'fixed top-0 right-0 left-0 h-[50px] p-10 flex items-center justify-end gap-2'}>
                    <GithubLink />
                </header>
                <main className="py-20">
                    <Heading />
                    <div className={'flex flex-col items-center justify-center gap-10'}>
                        <ImageCard url={DemoImage}></ImageCard>
                        <LoginButton>
                            <Button>Sign in to generate images</Button>
                        </LoginButton>
                    </div>
                </main>
            </SignedOut>
        </div>
    );
};

export default Home;

'use client'

import { Card } from '@/app/components/Card';
import {PoweredBy} from "@/app/components/PoweredBy";
import {
    LoginButton,
    LogoutButton,
    SignedIn,
    SignedOut,
    useAuth,
} from "@kobbleio/next/client";

export default function Home () {
    const { user } = useAuth();

    return (
        <div className="flex flex-col justify-between items-center w-full">
            <div className="flex gap-5 flex-col md:flex-row justify-between items-center max-w-full w-[1080px] pt-20 px-10">
                <div className="rounded-full border border-[#3b3b3b] bg-[#1f1f1f] text-[#fbfbfb] py-3 px-5">
                    Get started by editing <code className="font-semibold">src/pages/Home.tsx</code>
                </div>
                <div>
                    <PoweredBy />
                </div>
            </div>
            <main className="py-20">
                <span>Available actions:</span>
                <div className="flex items-center gap-2 justify-between mt-5">
                    <SignedOut>
                        <div className="flex items-center gap-2">
                            <LoginButton>
                                <button className="rounded-full border border-[#236456] bg-[#112220] text-[#33C6AB] py-1 px-3">
                                    Login
                                </button>
                            </LoginButton>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex flex-col gap-2">
                            <div className={'flex items-center gap-3'}>
                                <LogoutButton>
                                    <button className="rounded-full border border-[#236456] bg-[#112220] text-[#33C6AB] py-1 px-3">
                                        Logout
                                    </button>
                                </LogoutButton>
                            </div>
                        </div>
                    </SignedIn>
                </div>

                <Card className="overflow-x-scroll w-[500px]">
                    <span className="font-semibold">User profile</span>
                    <pre>{user ? JSON.stringify(user) : 'Not logged in'}</pre>
                </Card>
            </main>
        </div>
    );
};
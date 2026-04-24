'use client';

import LifeInsightsList from "@/components/LifeInsightsList";
import PostLifeInsightForm from "@/components/PostNewLifeInsightForm";
import useLifeInsights from "@/api/client-hooks/useLifeInsights";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ViewInsightsPage() {
    const { insightsData, isInsightsLoading, requestLifeInsights } = useLifeInsights();
    const router = useRouter();
    
    useEffect(() => {
        const $refetchInterval = setInterval(() => {
            requestLifeInsights();
        }, 60000);

        return () => {
            clearInterval($refetchInterval);
        };
    }, [requestLifeInsights]);

    const handleLogout = useCallback(async () => {
        localStorage.removeItem("user");
        router.replace("/");
    }, [router]);

    return (
        <>
            <div className="p-10 h-screen flex flex-col justify-between">
                <div className="flex flex-row gap-2 items-center justify-between">
                    <h1 className="font-bold text-5xl">Your posted situations</h1>
                    <button
                        onClick={handleLogout}
                        className="font-semibold cursor-pointer max-w-70 max-h-13 px-6 py-2.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition text-sm"
                    >logout</button>
                </div>
                    {isInsightsLoading ? (
                        <div className="bg-red-100 p-10 flex flex-col gap-5">
                            <p>Loading...</p>
                            <div className="animate-spin inline-block size-15 border-4 border-current border-t-transparent rounded-full text-blue-600" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        
                    ): (
                        !insightsData?.length ?
                            <p className="text-2xl">No insights posted yet</p> :
                            <LifeInsightsList listData={insightsData} />
                    )}
                    <button onClick={() => {
                        (window as any).post_new_life_insight_dialog.showModal();
                    }} className="cursor-pointer max-w-60 mt-10 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg">
                        Post new life-situation
                    </button>
            </div>
            <dialog id="post_new_life_insight_dialog" className="rounded-xl shadow-2xl backdrop:bg-gray-900/50 open:flex flex-col w-full items-center">
                <div className="p-6 min-w-150">
                    <h3 className="font-semibold text-3xl">Post new life insight</h3>
                    <p className="py-4 text-gray-600">Post your life insight in order to get support with a right decision outcome</p>
                    <PostLifeInsightForm refetchInsights={requestLifeInsights} />
                </div>
            </dialog>
        </>
    );
}

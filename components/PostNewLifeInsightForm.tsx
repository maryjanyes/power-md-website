'use client';

import useAuthenticatedUser from "@/api/client-hooks/useAuthenticatedUser";
import { insightPostStatus } from "@/api/constants/statuses";
import { postLifeInsight } from "@/api/server-actions/life-insight.actions";
import { useState } from "react";
import { useForm } from "react-hook-form";

const PostLifeInsightForm = ({ refetchInsights }: { refetchInsights: any }) => {
    const { authenticatedUser } = useAuthenticatedUser();
    const [isPostSubmitted, setIsPostSubmitted] = useState(false);
    const { register, handleSubmit, reset } = useForm<any>({
        defaultValues: {
            other_content: "",
            final_decision: "",
            situation_overview: "",
        },
    });

    const onCancelDialog = () => {
        const dialog = document.getElementById('post_new_life_insight_dialog');
        (dialog as any)?.close();
    };
   
    const onSubmit = async (values: any) => {
        try {
            setIsPostSubmitted(true);
            const newPostData = {
                ...values,
                status: insightPostStatus.new,
                publisherId: authenticatedUser?.id || 1,
            };
            await postLifeInsight(newPostData);
            reset();
            onCancelDialog();
            refetchInsights();
            setIsPostSubmitted(false);
        } catch (e) {
            // TODO: process error
            setIsPostSubmitted(false);
        }
    };
    
    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
                {isPostSubmitted && (
                    <div className="p-2 flex flex-col gap-5">
                        <p>Re-loading situations data...</p>
                        <div className="animate-spin inline-block size-15 border-4 border-current border-t-transparent rounded-full text-blue-600" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Situation overview</label>
                        <input
                            {...register("situation_overview", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                            placeholder="It was happened during my final math exam, i was asked to show my hidden notes"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Final decision</label>
                        <input
                            {...register("final_decision", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                            placeholder="I declined to presenting that"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Other content</label>
                        <input
                            {...register("other_content", { required: false })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                            placeholder="I was rejected by teacher from further exam competition"
                        />
                    </div> 
                    <div className="flex flex-row gap-2">
                        <button
                            disabled={isPostSubmitted}
                            type="submit"
                            className="cursor-pointer w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                        Create
                        </button>
                        <button
                            type="button"
                            onClick={onCancelDialog}
                            className="cursor-pointer w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-400 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostLifeInsightForm;

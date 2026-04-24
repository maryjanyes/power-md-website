/* eslint-disable @next/next/no-img-element */
import useLifeInsightAnalys from "@/api/client-hooks/useLifeInsightAnalys";
import { insightPostStatus, insightPostAnalysisStatus } from "@/api/constants/statuses";
import { useMemo } from "react";

const statusBadgeBgColor = {
    [insightPostStatus.processed]: "text-green-700",
    [insightPostStatus.new]: "text-blue-700",
};

const statusBadgeTextColor = {
    [insightPostStatus.processed]: "bg-green-200",
    [insightPostStatus.new]: "bg-blue-200",
};

const analysStatusBadgeBgColor = {
    [insightPostAnalysisStatus.failed]: "bg-red-400",
    [insightPostAnalysisStatus.success]: "bg-green-400",
};

const analysStatusBadgeTextColor = {
    [insightPostAnalysisStatus.failed]: "text-red-800",
    [insightPostAnalysisStatus.success]: "text-green-800",
};

const LifeInsightListItem = ({ ...insight }) => {
    const { insightAnalysData } = useLifeInsightAnalys(insight.id);
    const statusBadgeClass = `${statusBadgeBgColor[insight?.status] || ""} ${statusBadgeTextColor[insight?.status] || ""}`;
    const analysStatusBadgeClass = `${analysStatusBadgeBgColor[insightAnalysData?.status] || ""} ${analysStatusBadgeTextColor[insightAnalysData?.status] || ""}`;

    const renderAnalysData = useMemo(() => {
        if (insightAnalysData) {
            const categories = JSON.parse(insightAnalysData.analysis_category);
            const cognitiveDistortions = JSON.parse(insightAnalysData.cognitive_distortions_list);
            const missedAlternatives = JSON.parse(insightAnalysData.missed_alternatives);

            return (
                <div className="p-2 flex-auto w-[50%]">
                    <p className="text-lg font-semibold text-gray-800">Generated</p>
                    <p className="text-sm text-gray-600">
                        <span className="font-bold">General: </span>
                        {insightAnalysData.analysis_content}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-bold">Categories: </span>
                        {categories?.join(',')}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-bold">Cognitive distortions: </span>
                        {cognitiveDistortions?.join(',')}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-bold">Missed alternatives: </span>
                        {missedAlternatives?.join(',')}
                    </p>
                </div>
            );
        }

        return null;
    }, [insightAnalysData]);

    return (
        <li className="bg-gray-200 flex justify-between gap-x-6 py-5 px-4" key={insight.id}>
            <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
            />
            <div className="p-2 flex-auto w-[50%]">
                <p className="text-lg font-bold text-gray-900">Posted</p>
                <p className="text-sm text-gray-700">
                    <span className="font-bold">Overview:</span>
                    {insight.situation_overview}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-bold">Decision: </span>
                    {insight.final_decision}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-bold">Other: </span>
                    {insight.other_content || "--"}
                </p>
            </div>
            {renderAnalysData}
            <div className="hidden shrink-0 sm:flex sm:flex-col gap-2 sm:items-end">
                <span
                    className={`inline-flex items-center rounded-full px-2 py-1.5 text-xs font-medium ring-1 ring-inset ring-green-600/20 ${statusBadgeClass}`}
                >
                    {insight.status}
                </span>
                {!!insightAnalysData && <span
                    className={`inline-flex items-center rounded-full px-2 py-1.5 text-xs font-medium ring-1 ring-inset ring-green-600/20 ${analysStatusBadgeClass}`}
                >
                    {insightAnalysData.status}
                </span>}
            </div>
        </li>
    );
};

export default LifeInsightListItem;

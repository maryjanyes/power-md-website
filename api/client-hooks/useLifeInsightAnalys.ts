import { useEffect, useState } from "react";
import { getLifeInsightAnalysis } from "../server-actions/life-insight.actions";

const useLifeInsightAnalys = (postId: number) => {
    const [insightAnalysData, setInsightAnalysData] = useState<any>(undefined);
    const [isInsightAnalysLoading, setIsInsightAnalysLoading] = useState(false);
    
    useEffect(() => {
        requestLifeInsightAnalys();
    }, []);

    const requestLifeInsightAnalys = async () => {
        try {
            setIsInsightAnalysLoading(true);
            const data = await getLifeInsightAnalysis(postId);

            setInsightAnalysData(data);
            setIsInsightAnalysLoading(false);
        } catch (e) {
            // TODO: process error
            setIsInsightAnalysLoading(false);
        }
    };

    return { insightAnalysData, isInsightAnalysLoading, requestLifeInsightAnalys };
};

export default useLifeInsightAnalys;

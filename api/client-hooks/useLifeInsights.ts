'use client';

import { getLifeInsights } from "../server-actions/life-insight.actions";
import { useEffect, useState } from "react";
import useAuthenticatedUser from "./useAuthenticatedUser";

const useLifeInsights = () => {
    const [insightsData, setInsightsData] = useState<any>(undefined);
    const [isInsightsLoading, setIsInsightsLoading] = useState(false);
    const { authenticatedUser } = useAuthenticatedUser();
    
    useEffect(() => {
        requestLifeInsights();
    }, []);

    const requestLifeInsights = async () => {
        try {
            if (!insightsData) {
                setIsInsightsLoading(true);
            }

            const data = await getLifeInsights(authenticatedUser?.id || 1);

            setInsightsData(data);

            if (!insightsData) {
                setIsInsightsLoading(false);
            }
        } catch (e) {
            setIsInsightsLoading(false);
        }
    };

    return { insightsData, isInsightsLoading, requestLifeInsights };
};

export default useLifeInsights;

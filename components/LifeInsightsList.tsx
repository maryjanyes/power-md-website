import { LifeInsightPost } from "@/app/generated/prisma/client";
import LifeInsightListItem from "./LifeInsightListItem";

const LifeInsightsList = ({ listData }: { listData: LifeInsightPost[] }) => {
    return (
        <ul
            role="list"
            className="flex flex-col gap-2 divide-y divide-x divide-gray-400 shadow-sm rounded-xl"
        >
            {listData.map((insight) => (
                <LifeInsightListItem {...insight} key={insight.id} />
            ))}
        </ul>
    )
};

export default LifeInsightsList;

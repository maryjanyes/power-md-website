import { useState } from "react";

export const useFavourites = () => {
    const [items] = useState([]);

    return items;
};

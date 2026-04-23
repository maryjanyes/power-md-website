import { useEffect, useState } from "react"

const useAuthenticatedUser = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState<any>(undefined);

    useEffect(() => {
        let user: any = localStorage.getItem("user");
        user = user && JSON.parse(user);

        setAuthenticatedUser(user);
    }, []);

    return { authenticatedUser };
}

export default useAuthenticatedUser;


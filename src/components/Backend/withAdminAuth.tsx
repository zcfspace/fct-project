import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function withAdminAuth(PageComponent) {
    return function AdminAuthComponent(props) {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === "unauthenticated") {
                router.push("/login");
            }
        }, [status]);

        return <PageComponent {...props} />;
    };
}
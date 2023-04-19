import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [loading, session]);

  if (loading || !session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Aquí puedes agregar funcionalidades para permitir al administrador agregar, editar y eliminar platos del menú */}
    </div>
  );
}

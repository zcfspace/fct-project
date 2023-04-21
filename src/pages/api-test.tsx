import Link from "next/link";

export default function apiTest() {
  return (
    <div>
      <h1>API Example</h1>
      <h2>Session</h2>
      <p>/api/examples/session</p>
      <iframe src="/api/examples/session" />
      <h2>JSON Web Token</h2>
      <p>/api/examples/jwt</p>
      <iframe src="/api/examples/jwt" />
      <p>Seccion</p>
      <iframe src="/api/examples/session" />
      <button>
        <Link href="/api/auth/signout">Sign Out</Link>
      </button>
      <button>
        <Link href="/api/auth/signin">Sign In</Link>
      </button>
    </div>
  );
}

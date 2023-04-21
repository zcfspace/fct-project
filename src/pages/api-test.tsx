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
        <a href="/api/auth/signout">Sign Out</a>
      </button>
      <button>
        <a href="/api/auth/signin">Sign In</a>
      </button>
    </div>
  );
}

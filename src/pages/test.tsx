import Link from "next/link";
import { Toaster, toast } from 'sonner'


export default function apiTest() {
  return (
    <div>
      <button>
        <Link href="/api/auth/signout">Sign Out</Link>
      </button>
      <button>
        <Link href="/api/auth/signin">Sign In</Link>
      </button>

      <Toaster />
      <button onClick={() => toast('My first toast')}>
        Give me a toast
      </button>
    </div>
  );
}

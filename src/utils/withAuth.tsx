// import { useSession } from 'next-auth/client'
// import { useRouter } from 'next/router'

// export default function withAuth(Component) {
//     return function WithAuthComponent(props) {
//         const [session, loading] = useSession()
//         const router = useRouter()

//         if (loading) {
//             return <p>Loading...</p>
//         }

//         if (!session) {
//             router.push('/login')
//             return null
//         }

//         return <Component {...props} />
//     }
// }
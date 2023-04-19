import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Aquí puedes agregar lógica para verificar las credenciales del administrador
        const user = { id: 1, name: 'Admin' }
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl)
        ? url
        : baseUrl
    }
  }
})
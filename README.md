This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 📝 Installation

1. Clone the repository

    ```sh
    git clone
    ```

2. Install NPM packages

    ```sh
     npm install
    ```

3. Create a .env file with the following environment variables:

    ```sh
    GITHUB_ID=
    GITHUB_SECRET=
    DATABASE_URL=
    OPENAI_API_KEY=
    SMTP_HOST= 
    SMTP_PORT= 
    SMTP_USER=
    SMTP_PASSWORD=
    SMTP_FROM_EMAIL=
    ```

    You need a MongoDB URI, an OpenAI API token.
    - You can get an OpenAI API token by signing up for the [OpenAI API](https://beta.openai.com/).
    - You can get a MongoDB URI, by signing up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

4. Run the dev server

    ```sh
     npm run dev
    ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

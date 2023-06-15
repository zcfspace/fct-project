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
    NEXTAUTH_URL=
    NEXTAUTH_SECRET=

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

## Preview
![fct-project vercel app_](https://github.com/zcfspace/fct-project/assets/102738962/4534088b-5f60-4194-aa8b-f109da9f9879)
![fct-project vercel app_admin_dashboard](https://github.com/zcfspace/fct-project/assets/102738962/9662a892-6e13-48aa-b78d-9dc4764d1c3e)
![fct-project vercel app_admin_dashboard (1)](https://github.com/zcfspace/fct-project/assets/102738962/18fe3a98-131e-44b0-a071-0f2d0b27c0d4)
![fct-project vercel app_order](https://github.com/zcfspace/fct-project/assets/102738962/424c5c4c-0a1d-49e7-b40f-09379fa5b1f8)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

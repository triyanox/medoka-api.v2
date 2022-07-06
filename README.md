# Trentneuf Test

## Project Structure

- [All the source files](/src/)
  - [Entry File](/src/index.ts)
  - [Models](/src/models/)
  - [Controllers](/src//controllers/)
  - [Routes](/src/routes)
  - [Utilites](/src/lib/)
  - [Configurations](/src/config/)
  - [Middleware](/src/middleware/)

# Environment Variables

This a [sample](/sample-env.txt) of the environment variables used in this project

- **DATABASE_URL** : Switched to Mongodb
- **EMAIL_FROM** : the email sender
- **MAIL_USERNAME** : the email username
- **OAUTH_CLIENTID**, **OAUTH_CLIENT_SECRET** and **OAUTH_REFRESH_TOKEN** : used to authenticate with gmail using the 0Auth method because gmail dosn't suppot the **_Less secure_** featue anymore to send automated emails but those 3 env can be replace if we use another provider like outlook so we provide just the username and password, the **OAUTH_REFRESH_TOKEN** in production can be generated dynamically using the **googleapis SDK** for node .
- **JWT_SECRET** : used to sign and decode jwt tokens
- **FRONTEND_URL** : can be used to allow incoming requests fron a specific origin with cors or allow some headers

# Commands

- Developemnt

```
npm run dev
```

- Production

```
npm run start
```

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
- **OAUTH_CLIENTID**,**OAUTH_REDIRECT_URI**, **OAUTH_CLIENT_SECRET** and **OAUTH_REFRESH_TOKEN** : used to authenticate with gmail using the 0Auth2 method
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

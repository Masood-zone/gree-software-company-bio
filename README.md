This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Security and authentication setup

Copy `.env.example` to `.env.local` for local development. Generate
`BETTER_AUTH_SECRET` with a cryptographically secure random generator and never
commit the real value.

Before deploying the authentication migration:

1. Back up the production database.
2. Configure `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and
   `NEXT_PUBLIC_BASE_URL` in Vercel for every applicable environment. Production
   URLs should use `https://www.greesoftwarecompany.com`.
3. Run `npx prisma migrate deploy` against the intended database.
4. Deploy the application and confirm login, logout, enrollment ownership, and
   payment verification before allowing normal traffic.

The migration promotes `masoodacheampong@gmail.com` to the administrator role.
All other accounts default to the user role. Rotate the Better Auth secret and
integration credentials through Vercel if exposure is suspected; rotating the
auth secret invalidates existing sessions.

Report security issues using the contact published at
`/.well-known/security.txt`.

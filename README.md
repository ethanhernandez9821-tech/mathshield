# MathShield

MathShield is a Next.js site with:

- an arcade section
- a math lab section
- a profile system with XP and levels
- saved Drift Boss play-time progress for signed-in users

## Local Run

```powershell
cd C:\Users\Ethan\mathshield
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Current Features

- Daily featured arcade slot
- Drift Boss embedded in the site
- Login and sign up using local browser storage
- XP that only counts while signed in
- Profile page with a default avatar and level progress
- 15-minute Drift Boss challenge bar with saved progress

## Publish It

## 1. Initialize git if needed

```powershell
cd C:\Users\Ethan\mathshield
git init -b main
git add .
git commit -m "Initial MathShield site"
```

## 2. Push to GitHub

Create a new empty GitHub repo, then run:

```powershell
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## 3. Deploy on Vercel

- Sign in to Vercel
- Import the GitHub repo
- Add the environment variable `NEXT_PUBLIC_SITE_URL`
- Set it to your real production URL, for example `https://your-site.vercel.app`
- Deploy

## 4. Add a Custom Domain

After deployment, connect your domain in Vercel and update `NEXT_PUBLIC_SITE_URL` to that final domain.

## 5. Get Indexed

After the site is live:

- add the site in Google Search Console
- submit `/sitemap.xml`
- request indexing for the homepage

## Important Note

The current account system uses local browser storage, so accounts and XP are saved per browser/device.
If you want real accounts across devices, the next step is adding Firebase or Supabase.

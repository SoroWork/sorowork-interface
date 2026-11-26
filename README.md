# SoroWork Interface

> **Do the work. Prove it. Get paid.** — Community work, paid trustlessly on Stellar.

React + Vite + TypeScript frontend for SoroWork. Communities post real-world tasks — cleanups, road repairs, landscaping, painting, maintenance — and workers earn USDC for completing them. Connects to the [sorowork-backend](https://github.com/SoroWork/sorowork-backend) API and integrates Freighter wallet for Stellar.

## Features

- **Discover** — Browse open community tasks with search, status filters, and category tags
- **Task Detail** — Full task view with inline work submission (upload photos/video proof)
- **Profile** — Worker portfolios, reputation score, contribution history
- **Leaderboard** — Top community workers ranked by reputation
- **Activity Feed** — Real-time platform activity stream
- **Communities** — Join neighborhoods and groups, collaborate on local tasks
- **Dashboard** — Manage your posted tasks, review worker submissions
- **Admin Panel** — Platform analytics and user management
- **Freighter Wallet** — Non-custodial Stellar wallet connect/disconnect

## Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Components | Radix UI + shadcn patterns |
| State | TanStack Query v5 |
| Routing | React Router v6 |
| Wallet | Freighter API v2 |
| HTTP | Axios |

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3001` | Backend API base URL |
| `VITE_STELLAR_NETWORK` | `testnet` | Stellar network label |

## Freighter Wallet Setup

1. Install [Freighter](https://www.freighter.app) browser extension
2. Create or import a Stellar account
3. Switch to **Testnet** in Freighter settings
4. Click **Connect Wallet** — it will prompt you to sign a message for auth

## Pages

| Route | Page |
|---|---|
| `/` | Landing page |
| `/discover` | Browse community tasks |
| `/tasks/:id` | Task detail + submit work |
| `/profile/:walletAddress` | Worker profile |
| `/leaderboard` | Top workers |
| `/feed` | Activity feed |
| `/communities` | Community listing |
| `/notifications` | Your notifications |
| `/dashboard` | Task management dashboard |
| `/admin` | Admin panel (admin role required) |

## Build

```bash
npm run build
npm run preview
```

## Branding

| Token | Value |
|---|---|
| Navy background | `#0a0f1e` |
| Card background | `#0f1629` |
| Purple accent | `#6c47ff` |
| Electric blue | `#00d4ff` |

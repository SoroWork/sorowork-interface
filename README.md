# SoroWork Interface

> **Work. Prove. Earn.** — The decentralized work-to-earn platform on Stellar/Soroban.

React + Vite + TypeScript frontend for SoroWork. Connects to the [sorowork-backend](https://github.com/SoroWork/sorowork-backend) API and integrates Freighter wallet for Stellar.

## Features

- **Discover** — Browse open bounties with search, status filters, and tag filters
- **Task Detail** — Full bounty view with inline work submission
- **Profile** — Contributor portfolios, reputation, contribution history
- **Leaderboard** — Top earners ranked by reputation
- **Activity Feed** — Real-time platform activity stream
- **Communities** — Join communities and collaborate on bounties
- **Dashboard** — Creator view: manage bounties, review submissions
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
| `/discover` | Browse bounties |
| `/tasks/:id` | Task detail + submit work |
| `/profile/:walletAddress` | User profile |
| `/leaderboard` | Top contributors |
| `/feed` | Activity feed |
| `/communities` | Community listing |
| `/notifications` | Your notifications |
| `/dashboard` | Creator dashboard |
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

# CBL Tech

- **Frontend**: Angular (`frontend/`) — static SPA, built with `ng build`, styled with Tailwind v3.
- **Forms**: sent through [Web3Forms](https://web3forms.com) (access key in `frontend/src/environments/environment.ts`).
- **Hosting**: Vercel — `vercel.json` tells Vercel how to build the frontend.

## Run locally

```bash
cd frontend
npm install
npm start
```

## Build

```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/frontend/browser`, which is what `vercel.json` points to.

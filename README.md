This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev -- --hostname 127.0.0.1
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```bash
spotify-taste-mixer/src/
├── app/
│   ├── page.js                    # Página de inicio / login
│   ├── layout.js                  # Layout principal
│   ├── dashboard/
│   │   └── page.js                # Dashboard con widgets
│   ├── auth/
│   │   └── callback/
│   │       └── page.js            # Callback OAuth
│   └── api/
│       ├── spotify-token/
│       │   └── route.js           # Intercambio código por token
│       └── refresh-token/
│           └── route.js           # Refrescar token expirado
├── components/
│   ├── widgets/
│   │   ├── ArtistWidget.jsx       # Widget de artistas
│   │   ├── GenreWidget.jsx        # Widget de géneros
│   │   ├── DecadeWidget.jsx       # Widget de décadas
│   │   ├── MoodWidget.jsx         # Widget de mood/energía
│   │   └── PopularityWidget.jsx   # Widget de popularidad
│   ├── PlaylistDisplay.jsx        # Visualización de playlist
│   ├── TrackCard.jsx              # Tarjeta de canción
│   └── Header.jsx                 # Navegación y logout
├── lib/
│   ├── spotify.js                 # Funciones API Spotify
│   └── auth.js                    # Utilidades de autenticación
├── .env.local                     # Variables de entorno
└── README.md
```
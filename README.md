```bash
npm run dev -- --hostname 127.0.0.1
```
## Folder structure
```
└── 📁src
    └── 📁app
        └── 📁api
            └── 📁refresh-token
                ├── route.js
            └── 📁spotify-token
                ├── route.js
        └── 📁auth
            └── 📁callback
                ├── page.jsx
        └── 📁dashboard
            └── 📁artists
                ├── page.jsx
            └── 📁filters
                ├── page.jsx
            └── 📁genres
                ├── page.jsx
            └── 📁playlist
                ├── page.jsx
            ├── page.jsx
        ├── favicon.ico
        ├── globals.css
        ├── layout.js
        ├── not-found.js
        ├── page.js
    └── 📁components
        └── 📁widgets
            ├── ArtistWidget.jsx
            ├── DecadeWidget.jsx
            ├── GenreWidget.jsx
            ├── MoodWidget.jsx
            ├── PopularityWidget.jsx
        ├── Header.jsx
        ├── NavBar.jsx
        ├── PlaylistDisplay.jsx
        ├── TrackCard.jsx
    └── 📁lib
        ├── auth.js
        ├── preferences.js
        └── spotify.js
```
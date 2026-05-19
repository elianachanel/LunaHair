# LunaHair

<p align="center">
  <img src="assets/images/icon.png" width="96" alt="LunaHair icon" />
</p>

---

## English

Mobile hair-care app synced with **astronomical moon phases**. Plan rituals by the moon, log your daily routine, and get recommendations tailored to your hair type.

### Features

- **Lunar calendar** with phases via [SunCalc](https://github.com/mourner/suncalc) (8 phases, real illumination)
- **Daily recommendations**: nutrition wash, hydration, split ends trim, etc., by favorable phase
- **Daily hair log**: wash, masks, air dry, heat styling, split ends, and more
- **Lunar history** built from your real logs and completed rituals
- **Scheduled rituals** with cloud sync
- **Onboarding** with images: hair type, color, and thickness
- **Auth** with email/password and email verification (Firebase)
- **Demo mode** without Firebase to explore the UI

### Tech stack

| Technology | Purpose |
|------------|---------|
| [Expo SDK 54](https://docs.expo.dev/) | Mobile framework |
| [Expo Router](https://docs.expo.dev/router/introduction/) | Navigation |
| [TypeScript](https://www.typescriptlang.org/) | Typing |
| [NativeWind v4](https://www.nativewind.dev/) | Styling (Tailwind) |
| [Firebase](https://firebase.google.com/) | Auth + Firestore |
| [Zustand](https://zustand.docs.pmnd.rs/) | Global state |
| [SunCalc](https://github.com/mourner/suncalc) | Moon phases |

### Requirements

- **Node.js 20+** (recommended: `nvm use 20`)
- npm or yarn
- [Expo Go](https://expo.dev/go) on device (dev) or Xcode / Android Studio (native build)
- [Firebase](https://console.firebase.google.com/) account (optional; without it → demo mode)

### Installation

```bash
git clone https://github.com/elianachanel/LunaHair.git
cd LunaHair
npm install
```

#### Environment variables

```bash
cp .env.example .env
```

Fill `.env` with your Firebase **Web app** credentials (Firebase Console → Project settings).

Detailed guide: [FIREBASE.md](./FIREBASE.md)

#### Run in development

```bash
nvm use 20          # if using nvm
npx expo start
```

- **`i`** — iOS simulator  
- **`a`** — Android emulator  
- **`w`** — web  
- Scan the QR code with **Expo Go** (same Wi‑Fi as your machine)

After changing `.env`, restart with a clean cache:

```bash
npx expo start --clear
```

### Publish to GitHub

The project may already have local commits. To publish:

#### 1. Create an empty repo on GitHub

1. [github.com/new](https://github.com/new)
2. Name: `LunaHair`
3. **Do not** add README, `.gitignore`, or license (they already exist locally)
4. Create the repository

#### 2. Connect and push

```bash
git remote add origin https://github.com/elianachanel/LunaHair.git
git branch -M main
git push -u origin main
```

#### Alternative with GitHub CLI

```bash
gh auth login
gh repo create LunaHair --private --source=. --remote=origin --push
```

### Project structure

```
LunaHair/
├── app/                    # Screens (Expo Router)
│   ├── (auth)/             # Login, register, verify, onboarding
│   ├── (tabs)/             # Home, calendar, rituals, profile
│   └── lunar-history.tsx   # Full history
├── src/
│   ├── components/         # UI, calendar, hair care
│   ├── services/
│   │   ├── firebase/       # Auth, Firestore, sync
│   │   └── lunar/          # Calendar and recommendations
│   ├── store/              # Zustand (auth, rituals, logs)
│   ├── hooks/
│   ├── constants/
│   └── types/
├── assets/onboarding/      # Stepper illustrations
├── firestore.rules         # Firestore security rules
├── FIREBASE.md             # Firebase setup (step by step)
├── PUBLICAR.md             # Publish with EAS / stores (Spanish)
└── ARCHITECTURE.md         # Architecture notes
```

### Firebase / Firestore

| Collection | Content |
|------------|---------|
| `users` | Profile, hair type, onboarding |
| `routines` | Scheduled rituals |
| `hairCareLogs` | Daily hair log (`{userId}_{date}`) |

Deploy rules from `firestore.rules` in Firebase Console → Firestore → Rules.

Recommended index: collection `routines`, fields `userId` (Asc) + `scheduledAt` (Asc).

### Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Expo dev server |
| `npm run ios` | Build / run iOS |
| `npm run android` | Build / run Android |
| `npm run web` | Web version |

### Publishing the app

See [PUBLICAR.md](./PUBLICAR.md) for **Expo Go**, **EAS Build**, and store submission (Spanish).

### Security

- **Do not** commit `.env` (listed in `.gitignore`).
- `EXPO_PUBLIC_*` keys are public in the client; security relies on **Firestore Rules** and Auth.
- Rotate credentials if they were exposed by mistake.

### License

MIT — see [LICENSE](./LICENSE).

### Author

Eliana Batista

---

## Español

App móvil de cuidado capilar sincronizada con **fases lunares astronómicas**. Planifica rituales según la luna, registra tu rutina diaria y personaliza recomendaciones según tu tipo de cabello.

### Características

- **Calendario lunar** con fases calculadas vía [SunCalc](https://github.com/mourner/suncalc) (8 fases, iluminación real)
- **Recomendaciones del día**: lavado de nutrición, hidratación, corte de puntas, etc., según la fase favorable
- **Registro capilar diario**: lavado, mascarillas, secado al aire, calor, corte de puntas y más
- **Historial lunar** generado desde tus registros reales y rituales completados
- **Rituales programados** con sincronización en la nube
- **Onboarding** con imágenes: tipo, color y grosor del cabello
- **Autenticación** con email/contraseña y verificación de correo (Firebase)
- **Modo demo** sin Firebase para explorar la UI

### Stack

| Tecnología | Uso |
|------------|-----|
| [Expo SDK 54](https://docs.expo.dev/) | Framework móvil |
| [Expo Router](https://docs.expo.dev/router/introduction/) | Navegación |
| [TypeScript](https://www.typescriptlang.org/) | Tipado |
| [NativeWind v4](https://www.nativewind.dev/) | Estilos (Tailwind) |
| [Firebase](https://firebase.google.com/) | Auth + Firestore |
| [Zustand](https://zustand.docs.pmnd.rs/) | Estado global |
| [SunCalc](https://github.com/mourner/suncalc) | Fases lunares |

### Requisitos

- **Node.js 20+** (recomendado: `nvm use 20`)
- npm o yarn
- [Expo Go](https://expo.dev/go) en el móvil (desarrollo) o Xcode / Android Studio (build nativo)
- Cuenta [Firebase](https://console.firebase.google.com/) (opcional; sin ella → modo demo)

### Instalación

```bash
git clone https://github.com/elianachanel/LunaHair.git
cd LunaHair
npm install
```

#### Variables de entorno

```bash
cp .env.example .env
```

Rellena `.env` con las credenciales de tu app **Web** en Firebase Console → Configuración del proyecto.

Guía detallada: [FIREBASE.md](./FIREBASE.md)

#### Arrancar en desarrollo

```bash
nvm use 20          # si usas nvm
npx expo start
```

- **`i`** — simulador iOS  
- **`a`** — emulador Android  
- **`w`** — web  
- Escanea el QR con **Expo Go** (misma Wi‑Fi que el Mac)

Si cambias `.env`, reinicia con caché limpia:

```bash
npx expo start --clear
```

### Crear el repositorio en GitHub

El proyecto ya puede tener commits locales. Para publicarlo:

#### 1. Crear repo vacío en GitHub

1. [github.com/new](https://github.com/new)
2. Nombre: `LunaHair`
3. **No** añadas README, `.gitignore` ni licencia (ya existen en el repo local)
4. Crear repositorio

#### 2. Conectar y subir

```bash
git remote add origin https://github.com/elianachanel/LunaHair.git
git branch -M main
git push -u origin main
```

#### Alternativa con GitHub CLI

```bash
gh auth login
gh repo create LunaHair --private --source=. --remote=origin --push
```

### Estructura del proyecto

```
LunaHair/
├── app/                    # Pantallas (Expo Router)
│   ├── (auth)/             # Login, registro, verificación, onboarding
│   ├── (tabs)/             # Inicio, calendario, rutinas, perfil
│   └── lunar-history.tsx   # Historial completo
├── src/
│   ├── components/         # UI, calendario, cuidado capilar
│   ├── services/
│   │   ├── firebase/       # Auth, Firestore, sync
│   │   └── lunar/          # Calendario y recomendaciones
│   ├── store/              # Zustand (auth, rituales, logs)
│   ├── hooks/
│   ├── constants/
│   └── types/
├── assets/onboarding/      # Ilustraciones del stepper
├── firestore.rules         # Reglas de seguridad Firestore
├── FIREBASE.md             # Configuración Firebase paso a paso
├── PUBLICAR.md             # Publicar con EAS / tiendas
└── ARCHITECTURE.md         # Notas de arquitectura
```

### Firebase / Firestore

| Colección | Contenido |
|-----------|-----------|
| `users` | Perfil, tipo de cabello, onboarding |
| `routines` | Rituales programados |
| `hairCareLogs` | Registro capilar por día (`{userId}_{fecha}`) |

Publica las reglas de `firestore.rules` en Firebase Console → Firestore → Reglas.

Índice recomendado: colección `routines`, campos `userId` (Asc) + `scheduledAt` (Asc).

### Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo Expo |
| `npm run ios` | Build / run iOS |
| `npm run android` | Build / run Android |
| `npm run web` | Versión web |

### Publicar la app

Instrucciones para **Expo Go**, **EAS Build** y tiendas: [PUBLICAR.md](./PUBLICAR.md)

### Seguridad

- **No** subas `.env` al repositorio (está en `.gitignore`).
- Las claves `EXPO_PUBLIC_*` son públicas en el cliente; la seguridad depende de **Firestore Rules** y Auth.
- Rota credenciales si se filtraron por error.

### Licencia

MIT — ver [LICENSE](./LICENSE).

### Autora

Eliana Batista

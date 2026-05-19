# LunaHair — Arquitectura

App móvil premium de cuidado capilar sincronizado con **fases lunares astronómicas exactas** (SunCalc).

## Stack

- **Expo SDK 54** + **React Native**
- **Expo Router** (file-based navigation)
- **TypeScript**
- **NativeWind v4** (Tailwind)
- **Firebase** (Auth, Firestore, Storage)
- **Zustand** (estado global)
- **SunCalc** (cálculo lunar)
- **Reanimated** + **Expo Blur** + **Linear Gradient**

## Estructura

```
LunaHair/
├── app/                      # Rutas Expo Router
│   ├── _layout.tsx           # Root + auth init
│   ├── index.tsx             # Redirect auth/tabs
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── (tabs)/
│       ├── index.tsx         # Home
│       ├── calendar.tsx      # Calendario lunar
│       ├── rituals.tsx       # Rutinas
│       └── profile.tsx       # Perfil
├── src/
│   ├── components/
│   │   ├── ui/               # GlassCard, MoonCard, etc.
│   │   ├── layout/
│   │   └── calendar/
│   ├── services/
│   │   ├── firebase/
│   │   └── lunar/            # Calendario exacto
│   ├── hooks/
│   ├── store/
│   ├── constants/
│   └── types/
├── global.css
└── tailwind.config.js
```

## Calendario lunar (exacto)

`src/services/lunar/lunarCalendar.ts` usa **SunCalc.getMoonIllumination()**:

- `fraction` → porcentaje iluminado
- `phase` → posición en ciclo sinódico (0 = nueva, 0.5 = llena)
- `age` → días desde luna nueva

8 fases mapeadas con umbrales alineados al almanaque astronómico.

## Firebase

1. Copia `.env.example` → `.env`
2. Crea proyecto en Firebase Console
3. Activa Auth (Email + Google)
4. Crea Firestore y Storage

Colecciones: `users`, `routines`, `lunarHistory`

Sin `.env` → **modo demo** desde login.

## Comandos

```bash
cd LunaHair
npm install
cp .env.example .env   # opcional
npx expo start
```

## Próximos pasos

- [ ] Google Sign-In (`expo-auth-session`)
- [ ] Notificaciones push (rituales)
- [ ] Persistir historial lunar en Firestore
- [ ] Subir foto de perfil a Storage
- [ ] EAS Build para TestFlight / Play Store

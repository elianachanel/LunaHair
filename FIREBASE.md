# Configurar Firebase para LunaHair

## 1. Crear proyecto

1. Entra en [Firebase Console](https://console.firebase.google.com/).
2. **Crear proyecto** → nombre `LunaHair` (o el que prefieras).
3. Activa **Google Analytics** si quieres (opcional).

## 2. Registrar la app

1. En el proyecto → **Agregar app** → icono **Web** (`</>`).
2. Nombre: `LunaHair`.
3. Copia las credenciales del `firebaseConfig`.

## 3. Activar servicios

### Authentication
- **Authentication** → **Sign-in method** → activa **Correo/contraseña**.

### Firestore
- **Firestore Database** → **Crear base de datos** → modo **producción**.
- **Reglas** → pega el contenido de `firestore.rules` de este repo → **Publicar**.

### Índices (importante)
Si al cargar rituales ves error de índice, crea en **Firestore → Índices**:

| Colección | Campos |
|-----------|--------|
| `routines` | `userId` Asc, `scheduledAt` Asc |

O abre el enlace que aparece en el error de la consola de Expo.

## 4. Variables de entorno en la app

```bash
cp .env.example .env
```

Rellena `.env` con los valores de Firebase Console → Configuración del proyecto:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

Reinicia Metro después de cambiar `.env`:

```bash
nvm use 20
npx expo start --clear
```

## 5. Qué se guarda en Firestore

| Colección | Contenido |
|-----------|-----------|
| `users` | Perfil, tipo de cabello, hidratación |
| `routines` | Rituales / rutina capilar programada |
| `hairCareLogs` | Registro diario (lavado, secado, calor, etc.) |

Al iniciar sesión, la app sincroniza automáticamente perfil, rituales y registros del mes actual (`syncUserData`).

## 6. Modo demo vs cuenta real

- **Modo demo**: datos locales (registro capilar en AsyncStorage; rituales solo en memoria).
- **Cuenta real**: todo lo anterior en Firestore ligado a tu `uid`.

## 7. Estructura de código

```
src/services/firebase/
  config.ts      # App, Auth (persistencia), Firestore, Storage
  auth.ts        # Login, registro, logout
  errors.ts      # Mensajes en español
  sync.ts        # Carga inicial al entrar
  firestore/
    users.ts
    routines.ts
    hairLogs.ts
```

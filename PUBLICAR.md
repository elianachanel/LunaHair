# Cómo publicar / instalar LunaHair

## Opción 1 — Expo Go (rápido, sin subir a tiendas)

En tu Mac:

```bash
cd /Users/elianabatista/LunaHair
nvm use 20
npx expo start
```

1. Abre **Expo Go** en el iPhone.
2. Escanea el **QR** de la terminal.
3. Misma Wi‑Fi que la Mac.

Modo demo: en login → **Explorar en modo demo**.

---

## Opción 2 — EAS Build (app instalable, en la nube)

No necesitas Xcode 16 en la Mac; Expo compila en sus servidores.

```bash
cd /Users/elianabatista/LunaHair
nvm use 20
npm install -g eas-cli
eas login
eas init
eas build --platform ios --profile preview
```

- **iOS preview:** enlace para instalar en tu iPhone (TestFlight interno o ad hoc según cuenta).
- **Android APK:**

```bash
eas build --platform android --profile preview
```

Cuenta gratuita Expo: [expo.dev](https://expo.dev)

---

## Opción 3 — Simulador en Mac (requiere Xcode 16.1+)

Tu Mac tiene **Xcode 15.4**; React Native 0.81 pide **16.1+**.

Actualiza Xcode desde App Store, luego:

```bash
export LANG=en_US.UTF-8
npx expo run:ios
```

---

## App Store / Play Store

```bash
eas build --platform ios --profile production
eas submit --platform ios
```

Necesitas cuenta Apple Developer (99 USD/año) y cuenta Google Play.

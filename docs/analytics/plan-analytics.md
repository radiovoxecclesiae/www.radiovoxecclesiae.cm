# Plan Analytics — Radio Vox Ecclesiae

> Document de référence établi le 2026-04-11.  
> Destiné à guider l'implémentation complète du tracking et de l'analyse de données
> pour l'ensemble des plateformes Radio Vox Ecclesiae.

---

## Sommaire

1. [Vue d'ensemble du projet](#1-vue-densemble-du-projet)
2. [Les outils utilisés — explications pour débutant](#2-les-outils-utilisés--explications-pour-débutant)
3. [Architecture choisie](#3-architecture-choisie)
4. [Structure GTM — le container unique](#4-structure-gtm--le-container-unique)
5. [Structure GA4 — la propriété unique](#5-structure-ga4--la-propriété-unique)
6. [Dictionnaire des événements](#6-dictionnaire-des-événements)
7. [Gestion du consentement](#7-gestion-du-consentement)
8. [Suivi des liens de partage (UTM)](#8-suivi-des-liens-de-partage-utm)
9. [Plan d'implémentation step by step](#9-plan-dimplémentation-step-by-step)
10. [Périmètre et priorités](#10-périmètre-et-priorités)

---

## 1. Vue d'ensemble du projet

Radio Vox Ecclesiae est composée de trois plateformes :

| Plateforme | URL | Stack technique | Statut analytics |
|------------|-----|-----------------|-----------------|
| Site corporate | `www.radiovoxecclesiae.cm` | Next.js | gtag direct en place — à migrer vers GTM |
| App web radio | `app.radiovoxecclesiae.cm` | Expo (React Native Web) | Rien en place |
| App Android | APK (non publié sur Play Store) | Expo (React Native) | Firebase Analytics SDK intégré — en attente `google-services.json` |

### Objectifs du tracking

- **Acquisition** : savoir d'où viennent les visiteurs (WhatsApp, Facebook, Google, lien direct…)
- **Comportement** : quels écrans sont visités, dans quel ordre, combien de temps
- **Écoute radio** : qui écoute, combien de temps, quand, sur quel programme
- **Contenu** : quelles émissions / programmes génèrent le plus d'engagement
- **Conversions** : clics sur dons, soumissions de prières, téléchargement de l'app

---

## 2. Les outils utilisés — explications pour débutant

### Google Tag Manager (GTM)

**C'est quoi ?**  
GTM est un intermédiaire entre ton site web et les outils d'analyse. Au lieu de coller du code JavaScript directement dans tes pages pour chaque outil (GA4, Facebook Pixel, etc.), tu installes GTM **une seule fois** dans tes pages, puis tu gères tout le reste depuis l'interface GTM sans toucher au code.

**Les 3 concepts clés de GTM :**

```
TAG       = un bout de code qui s'exécute (ex: "envoie cet event à GA4")
TRIGGER   = la condition qui déclenche le tag (ex: "quand l'URL contient 'app.'")
VARIABLE  = une valeur réutilisable (ex: "le nom de domaine actuel")
```

**Analogie :** GTM est comme un tableau de bord électrique. Tu câbles une seule fois (installation GTM), puis tu allumes/éteins des circuits (tags) selon des conditions (triggers) sans rouvrir les murs.

**Ton container :** `GTM-MRH3G3W9`

---

### Google Analytics 4 (GA4)

**C'est quoi ?**  
GA4 est l'outil de rapport. C'est là que tu vas consulter tes données : combien de visiteurs, d'où ils viennent, combien de temps ils écoutent, etc.

**Les concepts clés de GA4 :**

```
PROPRIÉTÉ     = ton compte global Radio Vox Ecclesiae
DATA STREAM   = une source de données (www., app., Android)
ÉVÉNEMENT     = une action trackée (play, clic, soumission de prière…)
PARAMÈTRE     = une info qui accompagne l'événement (ex: nom du programme en cours)
DIMENSION     = un critère d'analyse (pays, plateforme, source du trafic…)
MÉTRIQUE      = une valeur mesurable (nombre de sessions, durée d'écoute…)
```

**Analogie :** GA4 est comme un tableau de bord de voiture. GTM capte les signaux (vitesse, température…), GA4 les affiche proprement.

**Relation GTM → GA4 :**  
GTM collecte les événements sur ton site, puis les envoie à GA4 qui les stocke et les affiche dans des rapports.

---

### Firebase Analytics

**C'est quoi ?**  
L'équivalent de GA4 pour les applications mobiles natives (Android/iOS). Intégré directement dans le code de l'app via un SDK (bibliothèque).

**Statut :** implémenté pour Android (Phase 6). Le SDK `@react-native-firebase/analytics` est intégré dans l'app Expo. La collecte automatique est désactivée par défaut (`firebase.json`) et activée uniquement après consentement utilisateur.

---

### Consent Mode v2

**C'est quoi ?**  
Un système de Google qui permet de respecter le choix de l'utilisateur concernant les cookies/tracking. Par défaut, le tracking est **bloqué**. Il se déverrouille uniquement si l'utilisateur clique "Accepter" dans la bannière de consentement.

**Pourquoi c'est important :**  
Sans ça, tu risques de collecter des données sans le consentement de l'utilisateur, ce qui pose des problèmes légaux (RGPD en Europe, Loi 2010/012 au Cameroun).

---

## 3. Architecture choisie

```
┌─────────────────────────────────────────────────────────────┐
│                    Utilisateur                               │
│         (visite www. ou app. ou utilise l'app Android)      │
└────────────────────┬────────────────────────────────────────┘
                     │
          ┌──────────▼──────────┐
          │   Google Tag Manager │
          │   GTM-MRH3G3W9      │  ← 1 seul container pour les 2 sites web
          │                     │
          │  Triggers hostname : │
          │  • www. → Tag A      │
          │  • app. → Tag B      │
          │  • tous → Tag C      │
          └──────────┬──────────┘
                     │
          ┌──────────▼──────────┐
          │      GA4            │
          │  1 propriété        │
          │  Radio Vox Ecclesiae│
          │                     │
          │  ┌───────────────┐  │
          │  │ Stream 1: www.│  │  → Measurement ID : G-XXXXXXX (à créer)
          │  ├───────────────┤  │
          │  │ Stream 2: app.│  │  → Measurement ID : G-YYYYYYY (à créer)
          │  ├───────────────┤  │
          │  │ Stream 3: APK │  │  → Measurement ID : G-ZZZZZZZ (plus tard)
          │  └───────────────┘  │
          └─────────────────────┘

          App Android (implémenté — Phase 6)
          ┌─────────────────────┐
          │  Firebase Analytics │  → SDK @react-native-firebase/analytics
          │  (même projet       │     intégré dans l'APK Expo
          │   Firebase / GA4)   │     collecte désactivée par défaut
          └─────────────────────┘
```

### Pourquoi 1 seul container GTM ?

Tu es seul à gérer les deux sites. Ils partagent la même marque, la même logique d'événements, et les mêmes objectifs. Avoir 2 containers GTM doublerait le travail de maintenance sans bénéfice réel. Dans GTM, les **triggers conditionnels** (basés sur le nom de domaine) permettent d'envoyer les bons événements au bon endroit.

### Pourquoi 1 seule propriété GA4 ?

Avec 1 propriété et 3 data streams, tu peux :
- Voir toutes tes données au même endroit
- Filtrer par plateforme (`www.` vs `app.` vs Android) dans les rapports
- Comparer le comportement entre plateformes facilement

---

## 4. Structure GTM — le container unique

### Variables à créer dans GTM

Les variables sont des valeurs réutilisables dans tes tags et triggers.

| Nom de la variable | Type | Valeur | Utilité |
|--------------------|------|--------|---------|
| `var_hostname` | Variable JavaScript | `window.location.hostname` | Détecter sur quel site on est |
| `var_ga4_id_corporate` | Constante | `G-36ZKFTPT5Q` (stream www.) | Measurement ID du corporate |
| `var_ga4_id_app` | Constante | `G-9FX7Y69PNW` (stream app.) | Measurement ID de l'app radio |
| `var_ga4_id_active` | Variable personnalisée | Retourne l'ID selon le hostname | Sélectionne automatiquement le bon ID |
| `var_consent_status` | Variable 1st-party cookie | clé `rve_analytics_consent` | Lire le consentement stocké |
| `var_page_path` | Variable intégrée GTM | `{{Page Path}}` | Chemin de la page courante |
| `var_page_title` | Variable intégrée GTM | `{{Page Title}}` | Titre de la page courante |

### Variable dynamique pour le Measurement ID

```javascript
// Variable de type "JavaScript personnalisé" dans GTM
function() {
  var host = window.location.hostname;
  if (host === 'www.radiovoxecclesiae.cm') {
    return 'G-36ZKFTPT5Q';
  }
  if (host === 'app.radiovoxecclesiae.cm') {
    return 'G-9FX7Y69PNW';
  }
  return null;
}
```

### Triggers à créer dans GTM

Les triggers définissent **quand** un tag doit s'exécuter.

| Nom du trigger | Type | Condition | Utilisé pour |
|----------------|------|-----------|--------------|
| `trigger_all_pages` | Page View | Toutes les pages | GA4 config, consentement |
| `trigger_corporate_only` | Page View | Hostname = `www.radiovoxecclesiae.cm` | Tags spécifiques au corporate |
| `trigger_app_only` | Page View | Hostname = `app.radiovoxecclesiae.cm` | Tags spécifiques à l'app radio |
| `trigger_consent_granted` | Custom Event | `event = 'consent_granted'` | Activer le tracking après acceptation |
| `trigger_all_custom_events` | Custom Event | `event` correspond à la regex `player_.*\|content_.*\|nav_.*\|prayer_.*\|donation_.*` | Tous les events custom |

### Tags à créer dans GTM

Les tags sont les actions exécutées quand un trigger se déclenche.

| Nom du tag | Type | Trigger | Ce qu'il fait |
|------------|------|---------|---------------|
| `tag_ga4_consent_default` | Code HTML personnalisé | `trigger_all_pages` — priorité 1 | Initialise Consent Mode v2 (denied by default) |
| `tag_ga4_config` | GA4 Configuration | `trigger_all_pages` | Initialise GA4 avec le bon Measurement ID |
| `tag_ga4_consent_update` | Code HTML personnalisé | `trigger_consent_granted` | Met à jour le consentement à "granted" |
| `tag_ga4_events` | GA4 Event | `trigger_all_custom_events` | Envoie tous les événements custom à GA4 |

---

## 5. Structure GA4 — la propriété unique

### Configuration de la propriété

- **Nom :** Radio Vox Ecclesiae
- **Fuseau horaire :** Afrique/Douala (WAT, UTC+1)
- **Devise :** XAF (Franc CFA)
- **Rétention des données :** 14 mois (maximum sur GA4 gratuit)

### Les 3 Data Streams

Un data stream = une source de données connectée à la propriété GA4.

**Stream 1 — Site corporate**
```
Nom          : www.radiovoxecclesiae.cm
Type         : Web
URL          : https://www.radiovoxecclesiae.cm
ID de flux   : 14348757303
Measurement ID : G-36ZKFTPT5Q
```

**Stream 2 — App web radio**
```
Nom          : app.radiovoxecclesiae.cm
Type         : Web
URL          : https://app.radiovoxecclesiae.cm
ID de flux   : 14351873224
Measurement ID : G-9FX7Y69PNW
```

**Stream 3 — App Android** *(plus tard)*
```
Nom          : RVE Android
Type         : Android
Package name : cm.radiovoxecclesiae.app
Measurement ID : G-ZZZZZZZ (généré par GA4 à la création)
```

### Événements personnalisés à enregistrer dans GA4

GA4 doit connaître tes événements custom pour les afficher dans les rapports. Tu les enregistres dans : **GA4 → Configure → Events → Create event**.

---

## 6. Dictionnaire des événements

Convention de nommage : **snake_case, préfixé par domaine** (max 40 caractères, compatible Firebase).

### Événements Player (app web radio + Android)

| Événement | Quand | Paramètres |
|-----------|-------|------------|
| `player_play` | L'utilisateur démarre l'écoute | `program_title`, `program_category`, `player_source`, `listen_session_id` |
| `player_pause` | L'utilisateur met en pause | `program_title`, `listen_duration_sec`, `listen_session_id` |
| `player_error` | Erreur de stream | `error_type`, `program_title` |
| `player_retry` | Tentative de reconnexion automatique | `retry_attempt` (1, 2 ou 3), `program_title` |
| `player_buffer_time` | Temps avant que l'audio démarre | `buffer_duration_ms` |

**Détail des paramètres player :**

```
program_title       : nom du programme en cours (ex: "Messe du matin")
                      → croisé avec la grille WAT au moment du play
program_category    : catégorie (ex: "messe", "emission", "musique")
player_source       : d'où vient le déclenchement
                      → "hero_button" | "mini_player" | "notification"
listen_session_id   : identifiant unique de la session d'écoute (généré au play)
                      → permet de relier play → pause d'une même écoute
                      → renommé depuis session_id (réservé par GA4)
listen_duration_sec : durée en secondes depuis le dernier play
retry_attempt       : numéro de la tentative (1, 2 ou 3 max)
buffer_duration_ms  : millisecondes entre le clic Play et le début du son
```

---

### Événements Navigation

L'objectif est de traquer la navigation sur tous les supports, mais l'event utilisé diffère selon le type d'application :

| Support | Event | Pourquoi |
|---------|-------|----------|
| **Corporate** (`www.`) | `page_view` — **natif GA4, automatique** | Site Next.js SSG multi-pages : chaque navigation déclenche un rechargement de page que GTM détecte automatiquement. Aucun code custom nécessaire. |
| **App radio** (`app.`) | `nav_screen_view` — **custom** | SPA (Single Page App) Expo : les changements d'onglet ne rechargent pas la page, GA4 ne les détecte pas tout seul. L'event custom est nécessaire. |
| **Android** | `screen_view` — **natif Firebase Analytics** | Firebase détecte automatiquement les changements d'Activity/Fragment. |

#### `nav_screen_view` (app radio web + Android uniquement)

| Événement | Quand | Paramètres |
|-----------|-------|------------|
| `nav_screen_view` | Changement d'onglet dans l'app | `screen_name`, `previous_screen`, `platform` |

```
screen_name      : "home" | "programme" | "prayers" | "station" | "support"
previous_screen  : écran précédent (pour analyser les parcours)
platform         : "web_app" | "android"
```

---

### Événements Contenu (app web radio + corporate)

| Événement | Quand | Paramètres |
|-----------|-------|------------|
| `content_share` | Clic sur le bouton Partager | `share_method`, `content_type`, `program_title` |
| `content_program_view` | Consultation de la grille de programme | `day_selected`, `program_count_visible` |
| `content_day_select` | Changement de jour dans la grille | `day_from`, `day_to` |

```
share_method   : "whatsapp" | "copy_link" | "native_share" | "facebook" | "sms"
content_type   : "live_stream" | "programme" | "station"
program_title  : nom du programme en cours au moment du partage
```

---

### Événements Prières (app web radio)

| Événement | Quand | Paramètres |
|-----------|-------|------------|
| `prayer_view` | Consultation de la liste des prières | `prayers_count_loaded` |
| `prayer_submit` | Soumission d'une nouvelle prière | `is_anonymous` (true/false) |
| `prayer_load_more` | Chargement de la page suivante | `page_number` |

---

### Événements Don (app web radio + corporate)

| Événement | Quand | Paramètres |
|-----------|-------|------------|
| `donation_intent` | Clic sur un bouton de don | `payment_method`, `source_screen` |

```
payment_method : "mtn" | "orange"
source_screen  : "home" | "support" | "sticky_bar"
```

---

### Événements Corporate (site www. uniquement — déjà en place, à migrer)

| Événement | Quand | Paramètres |
|-----------|-------|------------|
| `listen_live_click` | Clic "Écouter en direct" | — |
| `app_download_click` | Clic sur badge App Store / Play Store | `platform`, `source` |
| `contact_click` | Clic sur un contact | `channel` |
| `language_switch` | Changement de langue | `from`, `to` |
| `sticky_bar_click` | Clic sur la barre sticky | `action`, `platform` |

---

## 7. Gestion du consentement

### Principe — Consent Mode v2 (denied by default)

```
Utilisateur arrive sur le site
         │
         ▼
GTM initialise le consentement : TOUT BLOQUÉ
  analytics_storage    = denied
  ad_storage           = denied
  ad_user_data         = denied
  ad_personalization   = denied
         │
         ▼
Bannière de consentement affichée
         │
    ┌────┴────┐
    │         │
  Accepte   Refuse
    │         │
    ▼         ▼
Consentement  Consentement
mis à jour :  reste denied
GRANTED       (aucun tracking)
    │
    ▼
localStorage['rve_analytics_consent'] = 'granted'
dataLayer.push({ event: 'consent_granted' })
    │
    ▼
GTM déclenche tag_ga4_consent_update
    │
    ▼
GA4 commence à collecter les données
```

### Persistance du consentement

- Stocké dans `localStorage` avec la clé `rve_analytics_consent`
- Valeur `'granted'` si accepté, absente si refusé ou non répondu
- À chaque chargement de page, GTM lit cette valeur et met à jour le consentement automatiquement

### Implémentation technique

**Dans GTM — tag_ga4_consent_default (s'exécute en premier, avant tout) :**
```javascript
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500,
});
```

**Dans le code de l'app — quand l'utilisateur accepte :**
```javascript
// Stocker le consentement
localStorage.setItem('rve_analytics_consent', 'granted');

// Notifier GTM
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ event: 'consent_granted' });
```

**Dans GTM — tag_ga4_consent_update (déclenché par consent_granted) :**
```javascript
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'update', {
  analytics_storage: 'granted',
});
```

---

## 8. Suivi des liens de partage (UTM)

### C'est quoi les paramètres UTM ?

Les UTM sont des paramètres ajoutés à la fin d'une URL pour indiquer à GA4 d'où vient le visiteur. GA4 les lit automatiquement.

```
https://app.radiovoxecclesiae.cm?
  utm_source=whatsapp        ← qui envoie le trafic (WhatsApp)
  &utm_medium=social         ← le type de canal (réseaux sociaux)
  &utm_campaign=partage-live ← le nom de la campagne
  &utm_content=home-share    ← quel bouton / contenu a été partagé
```

### Paramètres UTM utilisés

| Paramètre | Valeurs possibles | Exemple |
|-----------|------------------|---------|
| `utm_source` | `whatsapp`, `facebook`, `sms`, `copy_link`, `email` | `whatsapp` |
| `utm_medium` | `social`, `messaging`, `direct` | `social` |
| `utm_campaign` | `live-sharing`, `programme-sharing` | `live-sharing` |
| `utm_content` | `hero_button`, `header_share`, `programme_day` | `hero_button` |

### Paramètres custom (en plus des UTM)

| Paramètre | Utilité | Exemple |
|-----------|---------|---------|
| `share_id` | ID unique du partage — permet de tracer la viralité | `abc123xyz` |
| `program_id` | Programme en cours au moment du partage | `messe-matin` |

### Exemple d'URL de partage générée

```
https://app.radiovoxecclesiae.cm
  ?utm_source=whatsapp
  &utm_medium=social
  &utm_campaign=live-sharing
  &utm_content=hero_button
  &share_id=k7m2p9
  &program_id=messe-matin
```

### Logique de génération dans le code

```typescript
// src/utils/share.ts (à enrichir)
function buildShareUrl(params: {
  source: 'whatsapp' | 'facebook' | 'sms' | 'copy_link' | 'email'
  content: string
  programId?: string
}): string {
  const base = process.env.EXPO_PUBLIC_SHARE_URL ?? 'https://app.radiovoxecclesiae.cm'
  const url = new URL(base)

  url.searchParams.set('utm_source', params.source)
  url.searchParams.set('utm_medium', 'social')
  url.searchParams.set('utm_campaign', 'live-sharing')
  url.searchParams.set('utm_content', params.content)
  url.searchParams.set('share_id', generateShareId())

  if (params.programId) {
    url.searchParams.set('program_id', params.programId)
  }

  return url.toString()
}

function generateShareId(): string {
  return Math.random().toString(36).slice(2, 8) // ex: "k7m2p9"
}
```

---

## 9. Plan d'implémentation step by step

### Phase 1 — GA4 : structurer la propriété *(~30 min dans l'interface GA4)*

| Étape | Action | Où |
|-------|--------|----|
| 1.1 | Ouvrir la propriété GA4 existante | analytics.google.com |
| 1.2 | Aller dans **Admin → Data Streams → Add stream → Web** | GA4 Admin |
| 1.3 | Créer le stream `www.radiovoxecclesiae.cm` | GA4 |
| 1.4 | Noter le Measurement ID généré (`G-XXXXXXX`) | — |
| 1.5 | Créer le stream `app.radiovoxecclesiae.cm` | GA4 |
| 1.6 | Noter le Measurement ID généré (`G-YYYYYYY`) | — |
| 1.7 | Dans chaque stream, activer **Enhanced Measurement** (scroll, outbound clicks, etc.) | GA4 |
| 1.8 | Régler la rétention des données à 14 mois (**Admin → Data Settings → Data Retention**) | GA4 |
| 1.9 | Régler le fuseau horaire sur **Afrique/Douala** (**Admin → Property Settings**) | GA4 |

---

### Phase 2 — GTM : configuration du container *(~1h dans l'interface GTM)*

| Étape | Action | Où |
|-------|--------|----|
| 2.1 | Ouvrir le container `GTM-MRH3G3W9` | tagmanager.google.com |
| 2.2 | Créer les variables (voir section 4) | GTM → Variables |
| 2.3 | Créer les triggers (voir section 4) | GTM → Triggers |
| 2.4 | Créer le tag `tag_ga4_consent_default` (priorité de déclenchement : 10) | GTM → Tags |
| 2.5 | Créer le tag `tag_ga4_config` avec la variable `var_ga4_id_active` | GTM → Tags |
| 2.6 | Créer le tag `tag_ga4_consent_update` | GTM → Tags |
| 2.7 | Créer le tag `tag_ga4_events` | GTM → Tags |
| 2.8 | Tester dans **GTM Preview mode** | GTM → Preview |
| 2.9 | Publier le container (Version 1 — "Initial setup") | GTM → Submit |

---

### Phase 3 — Migration corporate `www.` *(~2h de code)*

| Étape | Action | Fichier |
|-------|--------|---------|
| 3.1 | Supprimer le composant `GoogleAnalytics.tsx` | `src/components/GoogleAnalytics.tsx` |
| 3.2 | Créer le composant `GoogleTagManager.tsx` avec le snippet GTM | `src/components/GoogleTagManager.tsx` |
| 3.3 | Intégrer GTM dans le layout root (snippet `<head>` + noscript `<body>`) | `src/app/[locale]/layout.tsx` |
| 3.4 | Migrer `ConsentBanner.tsx` pour pousser vers `dataLayer` | `src/components/ConsentBanner.tsx` |
| 3.5 | Créer `src/lib/analytics.ts` avec la fonction `trackEvent(dataLayer.push)` | `src/lib/analytics.ts` |
| 3.6 | Mettre à jour les 6 composants qui appellent `gtag()` directement | Voir liste ci-dessous |
| 3.7 | Tester dans GTM Preview + GA4 DebugView | — |

**Composants à mettre à jour (étape 3.6) :**
- `src/components/ListenButton.tsx` → `listen_live_click`
- `src/components/StoreBadges.tsx` → `app_download_click`
- `src/components/DonateCard.tsx` → `donation_intent`
- `src/components/StickyBar.tsx` → `sticky_bar_click`
- `src/components/ContactGrid.tsx` → `contact_click`
- `src/components/Header.tsx` → `language_switch`

---

### Phase 4 — App web radio `app.` *(~3h de code)*

| Étape | Action | Fichier |
|-------|--------|---------|
| 4.1 | Intégrer le snippet GTM dans le layout Expo web | `src/app/_layout.tsx` |
| 4.2 | Créer le service analytics | `src/services/analytics.ts` |
| 4.3 | Créer la bannière de consentement | `src/components/ConsentBanner.tsx` |
| 4.4 | Brancher les events player dans `AudioPlayerContext` | `src/contexts/AudioPlayerContext.tsx` |
| 4.5 | Brancher les events de navigation dans le layout des tabs | `src/app/(tabs)/_layout.tsx` |
| 4.6 | Brancher les events de partage dans `utils/share.ts` | `src/utils/share.ts` |
| 4.7 | Brancher les events de prières dans l'écran Prières | `src/app/(tabs)/prayers.tsx` |
| 4.8 | Brancher les events de don dans `SupportDonationCards` | `src/components/support/SupportDonationCards.tsx` |
| 4.9 | Enrichir les URLs de partage avec les UTM | `src/utils/share.ts` |
| 4.10 | Tester dans GTM Preview + GA4 DebugView | — |

---

### Phase 5 — Validation & rapports *(~1h dans GA4)*

| Étape | Action | Où |
|-------|--------|----|
| 5.1 | Vérifier les données en temps réel | GA4 → Reports → Realtime |
| 5.2 | Activer GA4 DebugView et tester tous les events | GA4 → Admin → DebugView |
| 5.3 | Enregistrer les events custom dans GA4 | GA4 → Configure → Events |
| 5.4 | Créer des dimensions personnalisées (`program_title`, `player_source`, etc.) | GA4 → Configure → Custom Dimensions |
| 5.5 | Créer un rapport "Écoute radio" dans l'espace d'exploration | GA4 → Explore |
| 5.6 | Créer un rapport "Acquisition" pour voir les UTM | GA4 → Reports → Acquisition |
| 5.7 | Configurer une alerte si le nombre de sessions tombe à 0 | GA4 → Admin → Custom Insights |

---

### Phase 6 — App Android (Firebase Analytics)

| Étape | Action | Statut |
|-------|--------|--------|
| 6.1 | Ajouter `@react-native-firebase/app` + `@react-native-firebase/analytics` | Done |
| 6.2 | Configurer le plugin Expo dans `app.json` | Done |
| 6.3 | Désactiver la collecte auto (`firebase.json` → `analytics_auto_collection_enabled: false`) | Done |
| 6.4 | Implémenter `trackEvent()` natif avec Firebase Analytics + guard consent | Done |
| 6.5 | Brancher le consentement (`setAnalyticsCollectionEnabled` + `setConsent`) | Done |
| 6.6 | Créer un projet Firebase et télécharger `google-services.json` | **À faire** |
| 6.7 | Créer un data stream Android dans GA4 | **À faire** |
| 6.8 | Tester avec Firebase DebugView | **À faire** |

---

## 10. Périmètre et priorités

### Fait

- [x] Architecture décidée
- [x] **Phase 1** — Créer les data streams GA4
- [x] **Phase 2** — Configurer GTM
- [x] **Phase 3** — Migrer le corporate vers GTM
- [x] **Phase 4** — Instrumenter l'app web radio
- [x] **Phase 5** — Valider et créer les rapports
- [x] **Phase 6** — Firebase Analytics Android (code) — en attente `google-services.json`

### À faire plus tard

- iOS (pas encore disponible)
- Server-side tracking (events côté API)
- Alertes avancées et tableaux de bord Looker Studio

---

## Références

| Ressource | Lien |
|-----------|------|
| Interface GTM | https://tagmanager.google.com |
| Interface GA4 | https://analytics.google.com |
| Documentation Consent Mode v2 | https://developers.google.com/tag-platform/security/guides/consent |
| Documentation GA4 Events | https://developers.google.com/analytics/devguides/collection/ga4/events |
| GTM Preview Mode | Dans GTM → bouton "Preview" en haut à droite |
| GA4 DebugView | Dans GA4 → Admin → DebugView |

---

*Document généré le 2026-04-11 — dernière mise à jour le 2026-04-14.*

# ChocolaTrichomes & Terps - Telegram Mini App

Ce dépôt contient le code source de l'interface web (Mini App) pour **ChocolaTrichomes & Terps**, conçue pour fonctionner à l'intérieur de Telegram.

## 🚀 Déploiement (Hébergement)

Telegram exige que l'URL de votre Mini App soit sécurisée (**HTTPS**). Voici la méthode la plus simple et gratuite pour l'héberger :

### Option 1 : GitHub Pages (Recommandé)
1. Assurez-vous d'avoir poussé ce code sur un dépôt GitHub (public ou privé).
2. Allez dans les **Settings** (Paramètres) de votre dépôt.
3. Dans le menu de gauche, cliquez sur **Pages**.
4. Sous **Build and deployment**, sélectionnez la branche `main` (ou `master`) et le dossier `/(root)`.
5. Cliquez sur **Save**. GitHub vous fournira une URL du type : `https://votre-nom.github.io/nom-du-depot/`.
6. Attendez 1 à 2 minutes que le déploiement soit effectif.

### Option 2 : Vercel ou Netlify
Vous pouvez également glisser-déposer le dossier `output` (ou connecter votre dépôt GitHub) sur [Vercel](https://vercel.com) ou [Netlify](https://netlify.com) pour un déploiement instantané avec HTTPS.

---

## 🤖 Configuration du Bot Telegram

Une fois votre site hébergé et que vous avez votre URL HTTPS (ex: `https://votre-nom.github.io/nom-du-depot/`), suivez ces étapes pour lier l'application à votre bot :

1. Ouvrez Telegram et recherchez **@BotFather**.
2. Créez un nouveau bot avec la commande `/newbot` (ou utilisez un bot existant).
3. Envoyez la commande `/newapp` pour créer une nouvelle Mini App.
4. Sélectionnez votre bot dans la liste.
5. Entrez les informations demandées :
   - **Title** : ChocolaTrichomes & Terps
   - **Description** : Votre boutique de trichomes et terpènes.
   - **Photo** : (Optionnel) Envoyez une image de 640x360px.
   - **URL** : Collez l'URL HTTPS de votre site déployé (ex: `https://votre-nom.github.io/nom-du-depot/`).
   - **Short name** : Un nom court pour le lien direct (ex: `shop`).
6. BotFather vous donnera un lien direct vers votre Mini App (ex: `t.me/votre_bot/shop`).

### Ajouter un bouton "Menu" dans le bot
Pour que les utilisateurs puissent ouvrir l'application directement depuis l'écran de discussion du bot :
1. Dans @BotFather, envoyez la commande `/setmenubutton`.
2. Sélectionnez votre bot.
3. Envoyez l'URL HTTPS de votre Mini App.
4. Donnez un titre au bouton (ex: `Ouvrir la Boutique`).

---

## 📁 Structure du projet

```text
├── index.html          # Point d'entrée de l'application
├── css/
│   └── style.css       # Styles (Thème sombre, accents dorés, glassmorphism)
├── js/
│   └── app.js          # Logique d'interface et initialisation Telegram WebApp
└── README.md           # Ce fichier
```

## 🛠️ Développement local

Pour tester les modifications en local avant de déployer :
```bash
# Si vous avez Python installé
python3 -m http.server 3000

# Ou si vous avez Node.js installé
npx serve .
```
Ouvrez ensuite `http://localhost:3000` dans votre navigateur. Pour tester les fonctionnalités spécifiques à Telegram, utilisez les [Outils de développement Telegram](https://core.telegram.org/bots/webapps#testing-mini-apps) ou l'outil de débogage Web.

---

## 🎨 Personnalisation

Les couleurs et les variables de design sont centralisées dans `css/style.css` sous la forme `:root`. Vous pouvez facilement modifier :
- `--gold` : La couleur principale des accents.
- `--bg-primary` : La couleur de fond principale.
- `--font-display` : La police d'écriture.

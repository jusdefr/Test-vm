# VM Web Project

Ce dépôt contient une interface web simple pour :
- uploader un fichier ISO
- afficher le statut de la VM
- démarrer / arrêter une console de machine virtuelle
- être compatible PC + smartphone

## Ce que tu peux faire ici

Ce projet est pensé comme un frontend GitHub Pages / site statique pour lancer une VM depuis le navigateur via un backend externe.

Important :
- GitHub Pages seul ne peut pas exécuter une vraie machine virtuelle.
- La vraie VM doit tourner sur un serveur Linux/VPS avec QEMU, noVNC, ou Guacamole.
- Ce repo fournit l’interface web, la mise en page responsive, et le point d’entrée pour la console.

## Structure du projet

- `index.html` : page principale
- `styles.css` : design responsive
- `app.js` : logique d’upload et de contrôle de la VM

## Déploiement sur GitHub Pages

1. Pousse ce repo sur GitHub.
2. Va dans les paramètres du dépôt.
3. Active GitHub Pages.
4. Choisis la branche `main` et le dossier racine.
5. L’interface sera accessible en ligne.

## Configuration de la console VM

Ouvre `app.js` et modifie :

```js
const config = {
  backendUrl: "http://localhost:3000",
  defaultConsoleUrl: "https://example.com/vnc.html"
};
```

- `backendUrl` : URL de ton backend API
- `defaultConsoleUrl` : URL de la console noVNC ou Guacamole

## Exemples de backend à brancher

Tu peux connecter ce frontend à un backend qui fait :
- upload d’ISO
- démarrage QEMU
- arrêt de la VM
- génération d’une URL noVNC

## Compatibilité mobile

La page a été conçue pour être responsive :
- boutons larges
- écran de console adaptatif
- interface lisible sur smartphone

## Exemple de stack complète

- GitHub Pages : interface web
- Ubuntu VPS : service backend + VM
- QEMU : machine virtuelle
- noVNC : accès à la console dans le navigateur

## Prochaine étape recommandée

Ajoute ensuite un vrai backend Node.js / Express avec :
- upload de l’ISO
- création de disque VM
- lancement QEMU
- endpoint `/start-vm`
- endpoint `/stop-vm`
- endpoint `/upload-iso`

Pour la vraie VM, il faut un serveur distant, pas seulement GitHub Pages.

## Auteur

Projet créé pour `jusdefr/Test-vm`.

## Remarque importante

Ce repo est un point de départ fonctionnel pour le site, mais la VM réelle doit être hébergée ailleurs.

Si tu veux, je peux maintenant te préparer la version complète :
- backend Express
- scripts QEMU
- console noVNC
- README de déploiement complet

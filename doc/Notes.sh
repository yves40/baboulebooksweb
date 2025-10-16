# Start NextJS training
# Install next and the app creation tool in the top directory ( here NEXTJS )
# Commandes à exécuter dans la directorie cible. 
# Un sous répertoire sera créé : ici babweb
npm install next@latest --save
npm install create-next-app@latest --save
# Install a new app named 1.app-router
# Look here https://nextjs.org/docs/app/api-reference/cli/create-next-app
npx create-next-app@latest babweb --js --tailwind --turbopack --eslint --app --src-dir src
#
# Personnaliser ensuite les pages layout.jsx et page.jsx, véfifier que les 
# plugins d'aide pour HTML, TAILWIND et JSX fonctionnent bien
#
# Créer un .env.local au cas ou
# Ajouter errro.jsx et not-found.jsx sous src/app
#
# Add .gitignore file in the top dir
# Pousser une première version dans GIT
# From the top directory
git init
git commit -m "Initial"
git remote add origin https://github.com/yves40/baboulebooksweb.git
git push -u origin master

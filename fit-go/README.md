# Application FitGo

Projet réalisé par HATTSTADT QUENTIN & GILLIG HUGO

## Lancement du projet : 

  1) Cloner le projet 
  2) Dans le repertoire du projet, faire les commandes suivantes (en mode privilège): 

  `npm install`
  
  `npm run build`
  
  `npm run start`
   
  (si des problèmes de modules sont constatés, suppprimez le repertoire node_module et refaire les 3 commandes)
  
  (il est possible qu'il faut rajouter la commande `npm install sass` si besoin)
  
  3) Se mettre en vue mobile à l'aide de l'inspecteur d'éléments pour plus d'ergonomie.

## L'application : 

L'application est accessible avec le lien : fit-go.vercel.app.

Sur IOS, pour installer la PWA il suffit de cliquer sur l'option partager de son navigateur (par exemple Safari) et de cliquer sur "Sur l'écran d'accueil. Vous retrouvez alors l'application FitGO dans vos applications IOS.

Sur Android, nous n'avons pas pu tester car nous avions pas d'appareil sous se système d'exploitation.

L'application est composée de 5 pages.


#### Page HOME :

On y retrouve un bouton permettant de se connecter à son compte ou de s'inscrire si c'est votre première connexion. 
Une vue sur ses prochaines séances ainsi que sur son planning sont apparentes mais non fonctionnelles, se sera pour une V2.

#### Page STATISTIQUES :

Non développé, car lié au planning prochainement développé dans une V2.

#### Page MUSCULATION :

C'est ici qu'on va pouvoir lancer un programme et commencer une séance. Les exercices à faire vont apparaitre dans l'ordre avec les différents temps de repos et les nombres de répétitions/séries à respecter et éffectuer.

#### Page GESTION PROGRAMMES :

On y retrouve un listing des programmes déjà existants ainsi qu'un espace pour en créer des nouveaux. C'est également ici qu'on va s'attribuer des programmes à faire pour nos prochaines séances.

#### Page CALORIES :

On y retrouve un résumé de nos repas de la journées et ainsi voir notre apport/perte calorique quotidien et le pourcentage de glucides, lipides et protéines de nos aliments. Des suggestions sont égalements présentes.

## Son utilisation : 

<p align="justify">
Dans un premier temps, lancer l'application et rendez-vous sur la page HOME. Si c'est votre première connection inscrivez-vous, sinon connectez-vous (si vous vous êtes déjà connecté une fois, normalement votre compte reste connecté).
</p>

<p align="justify">
Une fois connecté, vous pouvez vous rendre sur la page MUSCULATION et immédiatement lancer un des programmes déjà proposé. Vous pouvez également vous rendre sur la page GESTION PROGRAMMES afin de créer vos programmes à l'aide du bouton '+' (aprés avoir précisé le nom et le type de votre nouveau programme, une liste d'exercices vous sera proprosée et à vous de selectionner ceux que vous souhaitez).
</p>

<p align="justify">
Durant vos repas de la journée, vous pouvez vous rendre sur la page CALORIES afin d'ajouter les différents aliments que vous avez manger pour avoir en fin de journée votre apport calorique quotidien. Pour cela, choisissez la catégorie du repas, cliquez sur ajout, précisez votre aliment/plat, cliquez sur '+' pour le selectionner, précisez la quantité et ajoutez-le. Revenez sur la page et vous verrez les calories de votre aliment s'ajouter aux calories consomées, ainsi que les pourcentages de glucides, lipides et protéines consommées se mettre à jour. Si vous retournez dans la catégorie de votre repas, vous voyez la liste des aliments consommées. Pour finir, à chaque nouvel ajout vous voyez combien de calorie il vous reste à consommée pour ce repas ainsi qu'une précision sur les glucides, lipides et protéines. (Vous pouvez également supprimez un aliment de la liste et les statistiques se mettront à jour)

Le nombre de calories brûlées se met à jour après la réalisation d'un programme.
</p>

## Caractéristiques

  1) L'application est composée de 5 pages.
  
  2) Une API en ligne est utilisée pour récupérer les calories des aliments.
  3) <p align="justify">Les données sont stockées dans une BDD et accessible à travers une API REST avec Node.js développée par nos soins et hébergée sur Heroku. Le lien du projet est : https://github.com/HattstadtQuentin/FitGo-API. Par exemple, si on effectue la requête GET https://fit-go.herokuapp.com/programmes, une liste des programmes nous est retournée sous format JSON.</p>
  4) <p align="justify">L'application reste accessible sans connexion Internet (la navigation entre pages ainsi que la structure de ces dernières reste visible). Cependant, toutes données qui neccessitent d'être récupérées en BDD ne seront pas affichées. </p>
  5) Votre compte est stocké dans les cookies, donc pas besoin de se connecter à chaque utilisation.

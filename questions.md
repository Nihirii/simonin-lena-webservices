## PUT & PATCH

Quelle est la différence entre un PUT un PATCH

Si on utilise PUT on est obligé de rerentré toute les donné de ce qu'on veux changer ( par exemple si nous voulons changer le nom de l'utilisateur il faudra rerentré aussi son email / son prenom etc.. en plus de son nom)
contrairement a PATCH ou on peux changer seulement le nom, pas besoin de rerentré le reste, tout restera intact.
en soit PUT efface la donné existante et la "recrée" alors que PATCH la modifie sans l'effacé

## FETCH/AXIOS

Pourquoi un call vers mon api depuis Postman fonctionne mais semble bloqué lorsque le même call est exécuté par Firefox?

Postman simplifie les tests d'API en ne tenant pas compte des problèmes de sécurité comme CORS (Cross-Origin Resource Sharing). En revanche, les navigateurs comme Firefox respectent les politiques de sécurité de CORS, ce qui peut bloquer les requêtes si elles ne respectent pas ces règles.

## NGINX/APACHE

Qu'est ce qui justifie d'avoir en plus de notre api node un serveur web comme Apache ou Nginx?

Un serveur web comme Apache ou Nginx offre une gestion efficace des requêtes HTTP, une sécurité renforcée, une meilleure performance et une flexibilité accrue pour uen application Node.js.

## PERFORMANCES

Citez 3 axes vus en cours pour améliorer les performance d'une api Rest

Mise en cache des donnees pour eviter leur recuperation sur le serveur a chaque requete
utiliser des indexs en bdd mettre en place un système de cache
Creation de types afin d'alleger les requetes

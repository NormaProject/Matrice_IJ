DATA MODEL – VERSION ACTUALISÉE AVEC GESTION DES CAS NULL

Le modèle ci-dessous décrit la structure à utiliser pour analyser un cas d’influence, d’ingérence ou de stratégie hybride. Toutes les classifications doivent être faites en tentant d’abord un match strict avec les trois fichiers de référence :

capacites.csv
objectifs.csv
techniques.csv

Si aucun match n’est possible, le LLM doit renvoyer null. Dans ce cas, il peut ensuite proposer de nouvelles catégories dans les champs dédiés (*_proposition).

RÈGLE TEMPORELLE IMPORTANTE :
La valeur de "date_analyse_zulu" doit toujours être générée ainsi :
1. Le LLM utilise l’heure locale Europe/Paris.
2. Il convertit cette heure en UTC (Zulu), en tenant compte du décalage (UTC+1 ou UTC+2 selon DST).
3. Il produit le résultat final au format datetime ISO 8601 (ex : 2025-11-29T22:52:00Z).

FORMAT DU USECASE

{
  "usecase_id": string unique,
  "titre": string,
  "url": string,
  "date_publication_zulu": datetime ISO 8601,
  "date_analyse_zulu": datetime ISO 8601,
  "auteur": string,

  "resume": string,
  "mecanisme_juridique": string,

  "attaquant": {
    "type_attaquant": string (state, non-state, entreprise, individu),
    "attaquant_pays_nato": string (code pays OTAN OR string)
  },

  "victime": {
    "type_victime": string,
    "victime_nom": string (code OTAN OR string)
  },

  "classification": {
    "techniques_id": [liste de TECH_ID ou null],
    "techniques_match": boolean,
    "techniques_proposition": [liste de nouvelles techniques proposées],

    "objectifs_id": [liste de OBJECTIF_ID ou null],
    "objectifs_match": boolean,
    "objectifs_proposition": [liste de nouveaux objectifs proposés],

    "capacites_id": [liste de CAPACITE_ID ou null],
    "capacites_match": boolean,
    "capacites_proposition": [liste de nouvelles capacités proposées]
  }
}

RÈGLES

Le LLM tente toujours un match strict avec les trois CSV.

Si un match existe :
- remplir *_id avec les ID trouvés
- mettre *_match = true
- mettre *_proposition = []

Si aucun match n’existe :
- mettre *_id = null
- mettre *_match = false
- remplir *_proposition avec de nouvelles catégories cohérentes

Les propositions doivent être courtes, cohérentes et réutilisables.

Le JSON produit doit respecter strictement la structure ci-dessus.

Aucune explication ne doit figurer dans le JSON, sauf dans resume et mecanisme_juridique.

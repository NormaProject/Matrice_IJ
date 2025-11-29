DATA MODEL – VERSION AVANCÉE AVEC MATCH STRICT, MATCH SOUPLE, GESTION DES CAS NULL ET POSITIONS DE TEXTE

Le modèle ci-dessous décrit la structure pour analyser un cas d’influence, d’ingérence ou de stratégie hybride.
Toutes les classifications doivent être faites en tentant d’abord un match strict avec les fichiers suivants :

- capacites.csv
- objectifs.csv
- techniques.csv

Si aucun match strict n’est possible → tenter un match souple (similarité sémantique).
Si le match souple échoue → renvoyer null et proposer une nouvelle catégorie.

Le match souple doit retourner un score (0–100).
Chaque classification doit indiquer la position du passage du texte source ayant motivé la détection, sous la forme d’un intervalle [start, end].

FORMAT DU USECASE :

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
    "type_attaquant": string,
    "attaquant_pays_nato": string
  },

  "victime": {
    "type_victime": string,
    "victime_nom": string
  },

  "classification": {
    "techniques_id": [liste de TECH_ID ou null],
    "techniques_match": boolean,
    "techniques_match_souple": [
      {
        "candidate": string,
        "score": number,
        "position": [start, end]
      }
    ],
    "techniques_proposition": [
      {
        "label": string,
        "position": [start, end]
      }
    ],

    "objectifs_id": [liste de OBJECTIF_ID ou null],
    "objectifs_match": boolean,
    "objectifs_match_souple": [
      {
        "candidate": string,
        "score": number,
        "position": [start, end]
      }
    ],
    "objectifs_proposition": [
      {
        "label": string,
        "position": [start, end]
      }
    ],

    "capacites_id": [liste de CAPACITE_ID ou null],
    "capacites_match": boolean,
    "capacites_match_souple": [
      {
        "candidate": string,
        "score": number,
        "position": [start, end]
      }
    ],
    "capacites_proposition": [
      {
        "label": string,
        "position": [start, end]
      }
    ]
  }
}

RÈGLES :

1. Match strict obligatoire.
2. Si strict = false → match souple.
3. Le match souple doit lister jusqu’à 3 suggestions avec score et position.
4. Si score < 60% → considérer que ce n’est pas un match exploitable.
5. Si strict + souple échouent → produire *_proposition avec positions.
6. Les positions doivent refléter l’endroit exact du texte source ayant motivé la détection.
7. date_analyse_zulu doit être générée depuis Europe/Paris puis convertie en UTC/Zulu.
8. Aucun texte hors resume et mecanisme_juridique ne doit être ajouté.

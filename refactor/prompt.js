DATA MODEL – VERSION PRODUCTION (MATCH STRICT + MATCH SOUPLE + POSITIONS + NULL CONTROL)

OBJET :
Le modèle structurel ci-dessous doit être suivi précisément. Il sert à analyser un cas d’ingérence, d’influence, de souveraineté numérique, de lawfare ou de stratégie hybride.

RÉFÉRENTIELS OBLIGATOIRES :
Toutes les classifications tentent d’abord un match strict avec :
- capacites.csv
- objectifs.csv
- techniques.csv

PROCESSUS DE CLASSIFICATION :
1. MATCH STRICT :
   - correspondance exacte texte ↔ CSV
   - si trouvé : *_id = liste des ID trouvés ; *_match = true ; *_match_souple = [] ; *_proposition = []
   - positions non requises

2. MATCH SOUPLE (si strict = false) :
   - analyse sémantique
   - renvoyer entre 0 et 3 candidats
   - chaque candidat contient : {"candidate": string, "score": number, "position": [start, end]}
   - score ∈ [0,100]
   - score ≥ 60 = potentielle correspondance, mais ne doit PAS remplir *_id

3. PROPOSITIONS (si strict = false ET score souple < 60) :
   - proposer des catégories nouvelles
   - format : {"label": string, "position": [start, end]}

4. DATE :
   - date_analyse_zulu : générée à partir de l’heure Europe/Paris convertie en UTC
   - format ISO 8601 obligatoire

FORMAT DU USECASE :

{
  "usecase_id": string,
  "titre": string,
  "url": string,
  "date_publication_zulu": string (ISO 8601),
  "date_analyse_zulu": string (ISO 8601),
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
    "techniques_id": [string or null],
    "techniques_match": boolean,
    "techniques_match_souple": [
      {
        "candidate": string,
        "score": number,
        "position": [number, number]
      }
    ],
    "techniques_proposition": [
      {
        "label": string,
        "position": [number, number]
      }
    ],

    "objectifs_id": [string or null],
    "objectifs_match": boolean,
    "objectifs_match_souple": [
      {
        "candidate": string,
        "score": number,
        "position": [number, number]
      }
    ],
    "objectifs_proposition": [
      {
        "label": string,
        "position": [number, number]
      }
    ],

    "capacites_id": [string or null],
    "capacites_match": boolean,
    "capacites_match_souple": [
      {
        "candidate": string,
        "score": number,
        "position": [number, number]
      }
    ],
    "capacites_proposition": [
      {
        "label": string,
        "position": [number, number]
      }
    ]
  }
}

CONTRAINTES :
- Ne jamais inventer d’ID.
- Ne jamais remplir *_id sans match strict.
- Ne jamais inventer de texte hors resume et mecanisme_juridique.
- Les positions doivent pointer exactement sur le passage source utilisé.
- Le JSON doit être strictement conforme.

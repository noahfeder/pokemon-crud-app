##Project 2: Pokemon Trainer
1. technologies used
    * express
    * mustache
    * bcrypt-as-promised
    * express-session
    * body-parser
    * pg-promise
    * request
    * jquery
    * jquery UI
    * materialize
    * bing image search API
    * animate.css

2. The approach taken

    Create an account, create teams of pokemon, and see how they would fare against other users' teams

3. Installation instructions

    Go to pokemonnoah.herokuapp.com


4. TABLES: 


        Users(id,username,password,color)

        Teams (team_id, team_name, pokemon_1_id REF pokemon, pokemon_2_id REF pokemon, pokemon_3_id REF pokemon, pokemon_4_id REF pokemon, pokemon_5_id REF pokemon, pokemon_6_id REF pokemon, user_id_ref REF users)

        Pokemon (poke_id, poke_name, img_name, type REFS types, hp, atk, def)

        Types (type_id, type_name, [various types] DEFAULT 1)


5. SOURCES:
    * pokemon imgs: www.pokestadium.com
    * seed data: www.pokemondb.net
    * type images: http://falke2009.deviantart.com/art/Pokemon-Type-Symbols-Downloadable-403610684
    * http://bulbapedia.bulbagarden.net/wiki/Damage : Damage algo
    * Bing Image Search API




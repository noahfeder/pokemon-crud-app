# project2

Tables

Users
* id
* username
* password

Teams
* id
* pokemon_1 REF pokemon
* pokemon_2 REF pokemon
* pokemon_3 REF pokemon
* pokemon_4 REF pokemon
* pokemon_5 REF pokemon
* pokemon_6 REF pokemon
* user_id REF users

Pokemon
* id
* name
* gif http://www.pokestadium.com/sprites/xy/[name].gif
* static http://www.pokestadium.com/sprites/green/[name].png
* type REFS type
* hp
* atk
* def

Types
* id
* name
* [various types] DEFAULT 1


SOURCES:
* imgs: pokestadium.com
* data: pokemondb.net

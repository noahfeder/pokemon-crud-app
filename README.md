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
* url-name
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
* Had to switch back to one port because Heroku, worked great locally

TODO: 
* LINK TO EDIT fix
* Can't edit other pppls teams
* Battle algo
* modal close separate from submit for dismissing modals
* team selection options:
** Random 6 pokemon
** random otheruser team
** select otheruser team


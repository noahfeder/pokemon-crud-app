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
* type images: http://falke2009.deviantart.com/art/Pokemon-Type-Symbols-Downloadable-403610684
* Had to switch back to one port because Heroku, worked great locally
* http://bulbapedia.bulbagarden.net/wiki/Damage : Damage algo

TODO: 
* Bing images tweak
* Colorize
* Remove BING key from images.js
* ~~LINK TO EDIT from /teams/~~
* ~~Can't edit other pls teams on /teams/:id/edit route~~
* ~~TYPE damage?~~
* ~~TYPE icons?~~
* ~~modal close separate from submit for dismissing modals on team create and team edit~~
* ~~team selection options:~~
  * ~~Random 6 pokemon NO~~
  * ~~random otheruser team CHECK~~
  * ~~select otheruser team NO~~


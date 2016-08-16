# project2
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

2. The approach taken
    Create an account, create teams of pokemon, and see how they would fare against other users' teams

3. Installation instructions
    Go to pokemonnoah.herokuapp.com
    

unsolved problems, etc.

4. TABLES: 


Users(id,username,password,color)

Teams (team_id, team_name, pokemon_1_id REF pokemon, pokemon_2_id REF pokemon, pokemon_3_id REF pokemon, pokemon_4_id REF pokemon, pokemon_5_id REF pokemon, pokemon_6_id REF pokemon, user_id_ref REF users)

Pokemon (poke_id, poke_name, img_name, type REFS types, hp, atk, def)

Types (type_id, type_name, [various types] DEFAULT 1)


5. SOURCES:
* imgs: pokestadium.com
* data: pokemondb.net
* type images: http://falke2009.deviantart.com/art/Pokemon-Type-Symbols-Downloadable-403610684
* Had to switch back to one port because Heroku, worked great locally
* http://bulbapedia.bulbagarden.net/wiki/Damage : Damage algo

TODO: 
* ~~Reference pages for pokemon (all,type,id,name) {use routes from pokemon.js}~~
* ~~Navbar/SideNav links to ref pages~~
* ~~Color-code bing colors to nav~~
* ~~remove local links to db~~
* ~~User color-coding?~~
* ~~trouble shoot drag-and-drop on #pokemon6 //library issue~~
* ~~Confirm delete modal~~
* ~~Battle Status update?~~
* ~~Login/Signup option~~
* ~~New user view~~
* ~~Bing images tweak~~
* ~~Colorize~~
* ~~Remove BING key from images.js~~
* ~~LINK TO EDIT from /teams/~~
* ~~Can't edit other pls teams on /teams/:id/edit route~~
* ~~TYPE damage?~~
* ~~TYPE icons?~~
* ~~modal close separate from submit for dismissing modals on team create and team edit~~
* ~~team selection options:~~
  * ~~Random 6 pokemon NO~~
  * ~~random otheruser team CHECK~~
  * ~~select otheruser team NO~~


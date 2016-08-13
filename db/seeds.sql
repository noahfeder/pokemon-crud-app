
-- ------------------------------------------------
-- -- TEST VALUES FOLLOW -- -- TODO REMOVE BELOW --
-- ------------------------------------------------
INSERT INTO users(username,password_hashed) VALUES('test','$2a$08$G/wb.f7OueY5eXjWZJIBzOVoxlRY/PxClukUUR1P7cCUfW9OCsFyu');
INSERT INTO users(username,password_hashed) VALUES('noah','$2a$08$bP/WM5GdfZbU3Hs.gfjO7O7yc7AwUtXqkIki9rAjZPDP.MB0xwowS');

INSERT INTO teams(
  team_name, pokemon_1_id, pokemon_1_order,
    pokemon_2_id, pokemon_2_order, pokemon_3_id,
    pokemon_3_order, pokemon_4_id, pokemon_4_order,
    pokemon_5_id, pokemon_5_order, pokemon_6_id, pokemon_6_order,
    user_id_ref)
  VALUES ('bulbasaurs',1,1,1,2,1,3,1,4,1,5,1,6,1);

INSERT INTO teams(
  team_name, pokemon_1_id, pokemon_1_order,
    pokemon_2_id, pokemon_2_order, pokemon_3_id,
    pokemon_3_order, pokemon_4_id, pokemon_4_order,
    pokemon_5_id, pokemon_5_order, pokemon_6_id, pokemon_6_order,
    user_id_ref)
  VALUES ('ivysaurs',2,1,2,2,2,3,2,4,2,5,2,6,2);

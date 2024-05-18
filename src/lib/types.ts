export type PokedexSearchParams = {
  pokedex: string;
  page: number;
  limit: number;
  sprite: spriteTypes;
};

export type spriteTypes =
  | "front_default"
  | "front_shiny"
  | "back_default"
  | "back_shiny"
  | "dream_world"
  | "home_default"
  | "home_shiny"
  | "official_artwork"
  | "official_artwork_shiny"
  | "showdown_front_default"
  | "showdown_front_shiny"
  | "showdown_back_default"
  | "showdown_back_shiny";

export type OtherSprites = {
  other: {
    dream_world: { front_default: string };
    home: { front_default: string; front_shiny: string };
    official_artwork: { front_default: string; front_shiny: string };
    showdown: {
      front_default: string;
      front_shiny: string;
      back_default: string;
      back_shiny: string;
    };
  };
};

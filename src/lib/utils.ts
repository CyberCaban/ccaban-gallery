import { type ClassValue, clsx } from "clsx";
import { OtherPokemonSprites, PokemonSprites, type Pokemon } from "pokenode-ts";
import { twMerge } from "tailwind-merge";
import { OtherSprites, PokemonSpritesWithShowdown, spriteTypes } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  if (!str) return "";
  let res = str.charAt(0).toUpperCase() + str.slice(1);
  if (res.indexOf("-") !== -1) {
    res = res.replace(/-./g, (x) => x.toUpperCase());
  }
  return res;
}

export function getPokemonImageUrl(
  pokemon: PokemonSpritesWithShowdown,
  sprite: spriteTypes,
) {
  if (!pokemon) return "";
  if (sprite === "front_default") return pokemon.front_default;
  if (sprite === "back_default") return pokemon.back_default;
  if (sprite === "front_shiny") return pokemon.front_shiny;
  if (sprite === "back_shiny") return pokemon.back_shiny;
  if (sprite === "dream_world") return pokemon.other?.dream_world.front_default;
  if (sprite === "home_default") return pokemon.other?.home?.front_default;
  if (sprite === "home_shiny") return pokemon.other?.home?.front_shiny;
  if (sprite === "official_artwork")
    return pokemon?.other?.["official-artwork"]?.front_default;
  if (sprite === "showdown_front_default")
    return pokemon?.other?.showdown.front_default;
  if (sprite === "showdown_front_shiny")
    return pokemon.other?.showdown.front_shiny;
  if (sprite === "showdown_back_default")
    return pokemon.other?.showdown.back_default;
  if (sprite === "showdown_back_shiny")
    return pokemon.other?.showdown.back_shiny;
  return pokemon.front_default;
}

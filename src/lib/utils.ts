import { type ClassValue, clsx } from "clsx";
import { OtherPokemonSprites, PokemonSprites, type Pokemon } from "pokenode-ts";
import { twMerge } from "tailwind-merge";
import { OtherSprites, spriteTypes } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  let res = str.charAt(0).toUpperCase() + str.slice(1);
  if (res.indexOf("-") !== -1) {
    res = res.replace(/-./g, (x) => x.toUpperCase());
  }
  return res;
}

export function getPokemonImageUrl(
  pics: PokemonSprites | { other: OtherPokemonSprites },
  sprite: spriteTypes,
) {
  if (sprite === "dream_world") return pics.other?.dream_world.front_default;
  if (sprite === "home_default") return pics.other?.home?.front_default;
  if (sprite === "home_shiny") return pics.other?.home?.front_shiny;
  if (sprite === "official_artwork")
    return pics?.other?.["official-artwork"]?.front_default;

  if (sprite === "showdown_front_default")
    return pics?.other?.showdown.front_default;
  if (sprite === "showdown_front_shiny")
    return pics.other?.showdown.front_shiny;
  if (sprite === "showdown_back_default")
    return pics.other?.showdown.back_default;
  if (sprite === "showdown_back_shiny") return pics.other?.showdown.back_shiny;
  return pics.front_default;
}

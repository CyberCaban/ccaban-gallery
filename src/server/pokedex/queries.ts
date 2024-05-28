import { GameClient, Pokemon, PokemonClient } from "pokenode-ts";

const gc = new GameClient({ cacheOptions: {} });
const pc = new PokemonClient();

export async function getAllPokedexes() {
  const pokedexNames = (await gc.listPokedexes(0, 40)).results.reduce(
    (acc, curr) => {
      return [...acc, curr.name] as string[];
    },
    new Array<string>(),
  );
  return pokedexNames;
}

export async function getPokemonPage(pokedexName: string, currentPage: number) {
  const names = (await gc.getPokedexByName(pokedexName)).pokemon_entries
    .reduce(
      (acc, curr) => [...acc, curr.pokemon_species.name] as string[],
      new Array<string>(),
    )
    .slice(10 * (currentPage - 1), 10 * currentPage);
  return names;
}

export async function getPokemonsByNames(pokemonNames: string[] = []) {
  const pokemons = (await Promise.allSettled(
    pokemonNames.map(async (name) => {
      return await pc.getPokemonByName(name);
    }),
  ).then((values) => {
    return values.map((value) =>
      value.status === "fulfilled"
        ? value.value
        : { name: value.reason.config.url.split("/").pop() as string },
    );
  })) as Pokemon[];

  return pokemons;
}

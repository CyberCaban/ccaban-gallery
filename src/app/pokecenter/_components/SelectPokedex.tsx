/* eslint-disable @typescript-eslint/no-unsafe-call */
import { capitalize } from "~/lib/utils";
import Pokedex from "pokedex-promise-v2";
import Link from "next/link";
import { PokedexSearchParams } from "~/lib/types";

export const dynamic = "force-dynamic";

async function PokedexList() {
  const p = new Pokedex();
  const pokemon = (await p.getPokedexList()).results.reduce((acc, curr) => {
    return [...acc, curr.name] as string[];
  }, []);
  return (
    <ul className="h-1/4 w-1/5 overflow-y-scroll text-nowrap bg-zinc-900 p-2">
      {pokemon.map((pokedex: string) => (
        <label htmlFor={pokedex} key={pokedex}>
          <Link href={{ query: { pokedex } }}>
            <li
              className="rounded-md p-4 text-xl hover:bg-zinc-950"
              id={pokedex}
            >
              {capitalize(pokedex)}
            </li>
          </Link>
        </label>
      ))}
    </ul>
  );
}

async function Pokemons({
  searchParams,
}: {
  searchParams: PokedexSearchParams;
}) {
  const p = new Pokedex();
  const pokemon = await p.getPokedexByName(searchParams.pokedex ?? "national");
  const a = await p.getPokemonsList({ limit: 30, offset: 0 });
  console.log(pokemon.pokemon_entries);

  // const pokemonPics = pokemon.pokemon_entries.map(
  //   async (pokemon: Pokedex.PokemonEntry, i) => {
  //     if (i < 10) {
  //       const pic = await p.getPokemonByName(pokemon.pokemon_species.name);
  //       return pic.sprites.front_default;
  //     } else {
  //       return null;
  //     }
  //   },
  // );
  // let pokemonPics: string[] = [];
  // await Promise.all(
  //   pokemon.pokemon_entries.map(async (pokemon) => {
  //     const pic = await p.getPokemonByName(pokemon.pokemon_species.name);
  //     return pic.sprites.front_default;
  //   }),
  // ).then((result) => {
  //   pokemonPics = result;
  // });

  // console.log(pokemonPics);
  return (
    <div>
      <h1>{JSON.stringify(searchParams)}</h1>
      <ul>
        {pokemon.pokemon_entries.map((p: Pokedex.PokemonEntry, i) => (
          <div key={p.entry_number}>
            <li>{p.pokemon_species.name}</li>
            {/* <img src={pokemonPics[i]} alt="" /> */}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default function SelectPokedex({
  searchParams,
}: {
  searchParams: PokedexSearchParams;
}) {
  return (
    <div
      id="pokedex"
      title="pokedex"
      className="flex w-full flex-row bg-zinc-800"
    >
      <PokedexList />
      <Pokemons searchParams={searchParams} />
    </div>
  );
}

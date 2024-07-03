/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { capitalize, getPokemonImageUrl } from "~/lib/utils";
import { type Pokemon } from "pokenode-ts";
import Link from "next/link";
import { type PokedexSearchParams } from "~/lib/types";
import {
  getAllPokedexes,
  getPokemonPage,
  getPokemonsByNames,
} from "~/server/pokedex/queries";
import PokeNav from "./PokeNav";
import PokePagination from "./PokePagination";

// export const dynamic = ""

async function PokedexList({
  searchParams,
}: {
  searchParams: PokedexSearchParams;
}) {
  const pokedexes = await getAllPokedexes();

  return (
    <div className="flex max-sm:w-full max-sm:flex-row max-sm:justify-center sm:flex-col sm:items-start">
      <h1 className="m-2 flex-shrink flex-grow-0 text-clip rounded-md bg-zinc-700 px-4 py-3 text-center text-2xl">
        Pokedex: {capitalize(searchParams.pokedex)}
      </h1>
      <ul className="max-sm:max-w-1/2 overflow-x-hidden overflow-y-scroll text-nowrap rounded-sm bg-zinc-900 p-2 max-sm:max-h-[30vh] sm:h-96">
        {pokedexes.map((pokedex: string) => (
          <label htmlFor={pokedex} key={pokedex} className="w-full">
            <Link
              href={{
                query: { pokedex, page: 1, sprite: searchParams.sprite },
              }}
            >
              <li
                className="w-full rounded-md p-4 text-[1.5rem] hover:bg-zinc-950"
                id={pokedex}
              >
                {capitalize(pokedex)}
              </li>
            </Link>
          </label>
        ))}
      </ul>
    </div>
  );
}

async function Pokemons({
  searchParams,
}: {
  searchParams: PokedexSearchParams;
}) {
  const names = await getPokemonPage(searchParams.pokedex, searchParams.page);
  const pokemonPics: Pokemon[] = await getPokemonsByNames(names);

  return (
    <div className="flex flex-grow flex-col overflow-y-hidden max-md:w-4/5 sm:w-full">
      <PokeNav searchParams={searchParams} names={names} />
      <div className="m-2 flex flex-wrap justify-center text-center transition">
        {pokemonPics.map((p) => {
          return (
            <Link href={`/pokecenter/card/${p.name}`} key={p.name}>
              <div className="m-2 flex w-48 flex-col items-center rounded-sm p-3 outline outline-1 outline-white">
                <div className="m-2 h-48 w-48">
                  <img
                    src={
                      getPokemonImageUrl(p.sprites, searchParams.sprite) ?? ""
                    }
                    alt={`Failed to load ${p.name}`}
                    // width={200}
                    // height={200}
                    loading="lazy"
                    id={`${p.name}`}
                    className="h-full w-full rounded-lg object-contain transition hover:scale-105 hover:drop-shadow-[0px_0px_5px_rgba(255,0,0,1.0)]"
                  />
                </div>
                <label htmlFor={`${p.name}`}>
                  <span className="text-xl">{capitalize(p.name)}</span>
                </label>
              </div>
            </Link>
          );
        })}
      </div>
      <PokePagination searchParams={searchParams} names={names} />
    </div>
  );
}

export default function PokedexPage({
  searchParams,
}: {
  searchParams: PokedexSearchParams;
}) {
  const params: PokedexSearchParams = {
    pokedex: searchParams.pokedex ?? "national",
    page: searchParams.page ?? 1,
    limit: 10,
    sprite: searchParams.sprite ?? "front_default",
  };
  return (
    <div
      id="pokedex"
      title="pokedex"
      className="flex w-full bg-zinc-800 max-sm:flex-col max-sm:items-center sm:flex-row"
    >
      <PokedexList searchParams={params} />
      <Pokemons searchParams={params} />
    </div>
  );
}

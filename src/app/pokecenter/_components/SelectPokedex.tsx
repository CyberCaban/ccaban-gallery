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

// export const dynamic = ""

async function PokedexList({
  searchParams,
}: {
  searchParams: PokedexSearchParams;
}) {
  const pokedexes = await getAllPokedexes();

  return (
    <ul className="h-96 w-56 overflow-x-hidden overflow-y-scroll text-nowrap bg-zinc-900 p-2">
      {pokedexes.map((pokedex: string) => (
        <label htmlFor={pokedex} key={pokedex} className="w-full">
          <Link
            href={{ query: { pokedex, page: 1, sprite: searchParams.sprite } }}
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
    <div className="flex w-4/5 flex-col overflow-y-hidden">
      <PokeNav searchParams={searchParams} names={names} />
      <div className="flex flex-wrap justify-center text-center transition">
        {pokemonPics.map((p) => {
          return (
            <Link href={`/pokecenter/card/${p.name}`} key={p.name}>
              <div className="m-2 flex w-48 flex-col items-center rounded-sm p-3 outline outline-1 outline-white">
                <div className="m-2 h-48 w-48">
                  <img
                    src={
                      getPokemonImageUrl(p.sprites, searchParams.sprite) ??
                      p.sprites.front_default
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
    </div>
  );
}

export default function SelectPokedex({
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
      className="flex w-full flex-row bg-zinc-800"
    >
      <PokedexList searchParams={params} />
      <Pokemons searchParams={params} />
    </div>
  );
}

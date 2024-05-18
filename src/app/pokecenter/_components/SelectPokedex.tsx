/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { capitalize } from "~/lib/utils";
import { GameClient, PokemonClient } from "pokenode-ts";
import Link from "next/link";
import { type PokedexSearchParams } from "~/lib/types";
import { Button } from "~/components/ui/button";

// export const dynamic = "force-dynamic";

async function PokedexList() {
  const gc = new GameClient();
  const pokemon = (await gc.listPokedexes(0, 40)).results.reduce(
    (acc, curr) => {
      return [...acc, curr.name] as string[];
    },
    new Array<string>(),
  );

  return (
    <ul className="h-96 w-40 overflow-y-scroll text-nowrap bg-zinc-900 p-2">
      {pokemon.map((pokedex: string) => (
        <label htmlFor={pokedex} key={pokedex}>
          <Link href={{ query: { pokedex, page: 1 } }}>
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
  const gc = new GameClient();
  const pokemons = await gc.getPokedexByName(searchParams.pokedex);
  console.log(searchParams.pokedex ?? "national");
  const p = new PokemonClient();
  const pokemonNames = pokemons.pokemon_entries.slice(
    10 * (searchParams.page - 1),
    10 * searchParams.page,
  );

  const pokemonPics = await Promise.all(
    pokemonNames.map(async (pokemon) => {
      return p
        .getPokemonByName(pokemon.pokemon_species.name)
        .then((p) => p.sprites)
        .catch((e) => console.log(e));
    }),
  );
  // console.log(typeof pokemonPics[9]?.other);

  return (
    <div className="flex flex-col">
      <nav className="mx-4 my-2 flex flex-row gap-4">
        <Link
          href={{
            query: {
              pokedex: searchParams.pokedex,
              page: searchParams.page > 1 ? +searchParams.page - 1 : 1,
            },
          }}
        >
          <Button>Prev Page</Button>
        </Link>
        <Link
          href={{
            query: {
              pokedex: searchParams.pokedex,
              page:
                pokemonNames.length === 10
                  ? +searchParams.page + 1
                  : +searchParams.page,
            },
          }}
        >
          <Button>Next Page</Button>
        </Link>
      </nav>
      <div className="flex flex-wrap justify-center text-center transition">
        {pokemonNames.map((p, i) => (
          <div key={p.entry_number}>
            <span className="text-xl">
              {capitalize(p.pokemon_species.name)}
            </span>
            <img
              src={
                pokemonPics[i]?.other?.["official-artwork"].front_default ?? ""
              }
              alt=""
              width={200}
              height={200}
              className="rounded-lg transition hover:scale-105 hover:drop-shadow-[0px_0px_5px_rgba(255,0,0,1.0)]"
            />
          </div>
        ))}
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
    sprite: "front_default",
  };
  return (
    <div
      id="pokedex"
      title="pokedex"
      className="flex w-full flex-row bg-zinc-800"
    >
      <PokedexList />
      <Pokemons searchParams={params} />
    </div>
  );
}

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { capitalize, getPokemonImageUrl } from "~/lib/utils";
import { GameClient, type Pokemon, PokemonClient } from "pokenode-ts";
import Link from "next/link";
import { type PokedexSearchParams } from "~/lib/types";
import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";

// export const dynamic = "force-dynamic";

async function PokedexList() {
  const gc = new GameClient();
  const pokedexes = (await gc.listPokedexes(0, 40)).results.reduce(
    (acc, curr) => {
      return [...acc, curr.name] as string[];
    },
    new Array<string>(),
  );

  return (
    <ul className="h-96 w-56 overflow-x-hidden overflow-y-scroll text-nowrap bg-zinc-900 p-2">
      {pokedexes.map((pokedex: string) => (
        <label htmlFor={pokedex} key={pokedex} className="w-full">
          <Link href={{ query: { pokedex, page: 1, sprite: "front_default" } }}>
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
  const gc = new GameClient();
  const pokemons = await gc.getPokedexByName(searchParams.pokedex);
  const p = new PokemonClient();
  const pokemonNames = pokemons.pokemon_entries.slice(
    10 * (searchParams.page - 1),
    10 * searchParams.page,
  );

  let pokemonPics: Pokemon[] = (await Promise.allSettled(
    pokemonNames.map(async (pokemon) => {
      return await p.getPokemonByName(pokemon?.pokemon_species?.name);
    }),
  ).then((values) =>
    values.map((value) =>
      value.status === "fulfilled"
        ? value.value
        : { name: "missingno", id: Infinity },
    ),
  )) as Pokemon[];
  pokemonPics = pokemonPics.filter((pokemon) => pokemon.name !== "missingno");
  console.log(pokemonPics[0]?.sprites.other);

  return (
    <div className="flex w-4/5 flex-col overflow-y-hidden">
      <nav className="flex flex-row gap-4">
        <div className="mx-4 my-2 flex flex-row gap-4">
          <Link
            href={{
              query: {
                pokedex: searchParams.pokedex,
                page: searchParams.page > 1 ? +searchParams.page - 1 : 1,
                sprite: searchParams.sprite,
              },
            }}
          >
            <Button size={"sm"}>Prev Page</Button>
          </Link>
          <Link
            href={{
              query: {
                pokedex: searchParams.pokedex,
                page:
                  pokemonNames.length === 10
                    ? +searchParams.page + 1
                    : +searchParams.page,
                sprite: searchParams.sprite,
              },
            }}
          >
            <Button size={"sm"}>Next Page</Button>
          </Link>
        </div>
        <form
          action={async (e) => {
            "use server";
            redirect(
              `/pokecenter?pokedex=${searchParams.pokedex}&page=${searchParams.page}&sprite=${e.get("sprite")}`,
            );
          }}
          method="get"
          className="flex items-center justify-center gap-4"
        >
          <select
            name="sprite"
            id="sprite_select"
            className="bg-zinc-900"
            defaultValue={searchParams.sprite}
          >
            <option value="front_default">front_default</option>
            <option value="back_default">back_default</option>
            <option value="front_shiny">front_shiny</option>
            <option value="back_shiny">back_shiny</option>
            <option value="dream_world">dream_world</option>
            <option value="official_artwork">official_artwork</option>
            <option value="home_default">home</option>
            <option value="showdown_front_default">showdown</option>
          </select>
          <button type="submit" className="rounded-sm bg-zinc-900 px-2 py-1">
            Submit
          </button>
        </form>
      </nav>
      <div className="flex flex-wrap justify-center text-center transition">
        {pokemonPics.map((p, i) => {
          return (
            <Link href={`/pokecenter/card/${p.name}`} key={p.id}>
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
      <PokedexList />
      <Pokemons searchParams={params} />
    </div>
  );
}

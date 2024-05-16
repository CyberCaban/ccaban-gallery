/* eslint-disable @typescript-eslint/no-unsafe-call */
import { capitalize } from "~/lib/utils";
import Pokedex from "pokedex-promise-v2";
import Link from "next/link";

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

export default function SelectPokedex() {
  return (
    <div id="pokedex" title="pokedex" className="w-full bg-zinc-800">
      <PokedexList />
    </div>
  );
}

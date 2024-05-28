"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "~/components/ui/button";
import { PokedexSearchParams } from "~/lib/types";

export default function PokeNav({
  searchParams: pokemonSearchParams,
  names,
}: {
  searchParams: PokedexSearchParams;
  names: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <nav className="flex flex-row gap-4">
      <div className="mx-4 my-2 flex flex-row gap-4">
        <Link
          href={{
            query: {
              pokedex: pokemonSearchParams.pokedex,
              page:
                pokemonSearchParams.page > 1
                  ? +pokemonSearchParams.page - 1
                  : 1,
              sprite: pokemonSearchParams.sprite,
            },
          }}
        >
          <Button size={"sm"}>Prev Page</Button>
        </Link>
        <Link
          href={{
            query: {
              pokedex: pokemonSearchParams.pokedex,
              page:
                names.length === 10
                  ? +pokemonSearchParams.page + 1
                  : +pokemonSearchParams.page,
              sprite: pokemonSearchParams.sprite,
            },
          }}
        >
          <Button size={"sm"}>Next Page</Button>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-1">
        <label htmlFor="sprite_select">Select sprite:</label>
        <select
          name="sprite"
          id="sprite_select"
          className="rounded-md bg-zinc-900 px-2 py-1"
          defaultValue={pokemonSearchParams.sprite}
          onChange={(e) => {
            console.log(e.target.value);
            router.push(
              pathName + "?" + createQueryString("sprite", e.target.value),
            );
          }}
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
      </div>
    </nav>
  );
}

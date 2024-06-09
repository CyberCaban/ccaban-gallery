"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { PokedexSearchParams } from "~/lib/types";
import PokePagination from "./PokePagination";

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
    <nav className="flex items-center gap-4 max-md:flex-col sm:flex-row">
      <PokePagination searchParams={pokemonSearchParams} names={names} />
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

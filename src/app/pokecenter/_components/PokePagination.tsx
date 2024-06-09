import Link from "next/link";
import { Button } from "~/components/ui/button";
import { PokedexSearchParams } from "~/lib/types";

export default function PokePagination({
  searchParams: pokemonSearchParams,
  names,
}: {
  searchParams: PokedexSearchParams;
  names: string[];
}) {
  return (
    <div className="mx-4 my-2 flex flex-row gap-4">
      <Link
        href={{
          query: {
            pokedex: pokemonSearchParams.pokedex,
            page:
              pokemonSearchParams.page > 1 ? +pokemonSearchParams.page - 1 : 1,
            sprite: pokemonSearchParams.sprite,
          },
        }}
      >
        <Button size={"sm"}>Prev Page</Button>
      </Link>
      <h1 className="flex items-center text-xl">{pokemonSearchParams.page}</h1>
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
  );
}

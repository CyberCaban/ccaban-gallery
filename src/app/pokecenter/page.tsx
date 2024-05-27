/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type PokedexSearchParams } from "~/lib/types";
import SelectPokedex from "./_components/SelectPokedex";

export default async function PokecenterPage({
  searchParams,
}: {
  searchParams: PokedexSearchParams;
}) {
  return (
    <div>
      {JSON.stringify(searchParams)}
      <SelectPokedex searchParams={searchParams} />
    </div>
  );
}

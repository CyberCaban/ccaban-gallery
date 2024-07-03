/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type PokedexSearchParams } from "~/lib/types";
import PokedexPage from "./_components/SelectPokedex";

export default async function PokecenterPage({
  searchParams,
}: {
  searchParams: PokedexSearchParams;
}) {
  return (
    <div>
      {/* {JSON.stringify(searchParams)} */}
      <PokedexPage searchParams={searchParams} />
    </div>
  );
}

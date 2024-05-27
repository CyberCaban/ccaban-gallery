import { PokemonClient } from "pokenode-ts";

export default async function PokemonStats(props: { name: string }) {
  const pc = new PokemonClient();
  // const pokemon = await pc.getPokemonByName(props.name);
  return <div className="text-3xl text-white">hello {props.name}</div>;
}

import { convertSprites, flattenObject } from "~/lib/utils";
import { getPokemonByName } from "~/server/pokedex/queries";

export default async function PokemonStats(props: { name: string }) {
  const poke = await getPokemonByName(props.name);
  const sprites = flattenObject(poke.sprites);
  console.log("poke", sprites);

  return (
    <div>
      <div className="text-3xl text-white">hello {poke.name}</div>;
      <h1 className="text-3xl text-red-700">Stats</h1>
      {poke.stats.map((stat) => (
        <div className="text-white" key={stat.stat.name}>
          {stat.stat.name}: {stat.base_stat}
        </div>
      ))}
      <h1 className="text-3xl text-red-700">Types</h1>
      {poke.types.map((type) => (
        <div className="text-white" key={type.type.name}>
          {type.type.name}
        </div>
      ))}
      <h1 className="text-3xl text-red-700">Abilities</h1>
      {poke.abilities.map((ability) => (
        <div className="text-white" key={ability.ability.name}>
          {ability.ability.name}
        </div>
      ))}
      <h1 className="text-3xl text-red-700">Moves</h1>
      {poke.moves.map((move) => (
        <div className="text-white" key={move.move.name}>
          {move.move.name}
        </div>
      ))}
      {Object.keys(sprites).map((key) => {
        if (sprites[key]) {
          return (
            <img
              src={sprites[key]}
              alt={key}
              width={200}
              height={200}
              className="text-white"
              key={key}
            />
          );
        }
      })}
    </div>
  );
}

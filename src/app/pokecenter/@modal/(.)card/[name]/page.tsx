import Modal from "~/app/components/modal";
import PokemonStats from "~/app/pokecenter/_components/pokemon-stats";

export default async function Card({
  params: { name: pokemonName },
}: {
  params: { name: string };
}) {
  return (
    <Modal>
      <PokemonStats name={pokemonName}></PokemonStats>
    </Modal>
  );
}

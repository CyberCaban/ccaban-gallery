"use client";
import Modal from "~/app/components/modal";
import PokemonStats from "~/app/pokecenter/_components/pokemon-stats";
import { useEffect } from "react";

export default function Card({
  params: { name: pokemonName },
}: {
  params: { name: string };
}) {
  useEffect(() => {
    if (window.location.href.includes("card")) {
      window.document.querySelector("body")?.classList.add("overflow-hidden");
    }
    return () => {
      window.document
        .querySelector("body")
        ?.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <Modal>
      <PokemonStats name={pokemonName}></PokemonStats>
    </Modal>
  );
}

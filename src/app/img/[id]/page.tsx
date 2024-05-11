import FullPageImageView from "~/app/components/full-image-page";

export default async function ImagePage({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(imageId);
  if (isNaN(idAsNumber)) return null;

  return <FullPageImageView id={idAsNumber} />;
}

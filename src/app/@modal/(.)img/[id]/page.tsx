import Modal from "./modal";
import FullPageImageView from "~/app/components/full-image-page";

export default async function ImageModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(imageId);
  if (isNaN(idAsNumber)) return null;

  return (
    <Modal>
      <FullPageImageView id={idAsNumber} />
    </Modal>
  );
}

import { getImageById } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImageById(props.id);
  if (!image) return null;

  return (
    <img
      className="w-[80%]"
      src={image.url}
      alt={image.name}
      width={480}
      height={360}
      loading="lazy"
    />
  );
}

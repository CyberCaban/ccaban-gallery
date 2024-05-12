import { getImageById } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImageById(props.id);
  if (!image) return null;

  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center bg-black/60 text-white">
      <div className="ml-4 flex-shrink flex-grow">
        <img
          src={image.url}
          alt={image.name}
          loading="lazy"
          className="object-contain"
          style={{ viewTransitionName: `img-${image.id}` }}
        />
      </div>
      <div className="border-1 flex h-full w-56 flex-shrink-0 flex-col">
        <div className="text-xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}

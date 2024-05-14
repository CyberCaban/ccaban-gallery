import { getImageById } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImageById(props.id);
  if (!image) return null;

  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center bg-black/60 text-white">
      <div className="ml-4 max-h-full rounded-xl shadow-white drop-shadow-lg">
        <img
          src={image.url}
          alt={image.name}
          loading="lazy"
          className="object-contain"
        />
      </div>
      <div className="border-1 flex max-h-full w-56 flex-col rounded-lg border border-white p-4">
        <div className="text-xl font-bold">{image.name}</div>
        <div>
          <a href={image.url}>
            <p className="text-sm text-gray-400">{image.url}</p>
          </a>
        </div>
      </div>
    </div>
  );
}

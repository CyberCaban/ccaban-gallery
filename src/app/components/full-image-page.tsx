import { Button } from "~/components/ui/button";
import { deleteImage, getImageById } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImageById(props.id);
  if (!image) return null;

  return (
    <div className="flex h-full w-screen min-w-0 flex-row items-center justify-center gap-4 bg-black/60 text-white">
      <div className="flex flex-1 justify-center rounded-xl shadow-white drop-shadow-lg">
        <img
          src={image.url}
          alt={image.name}
          loading="lazy"
          className="object-contain"
        />
      </div>
      <div className="flex-2 flex h-1/2 max-w-56 flex-col rounded-lg ">
        <div className="text-pretty text-center text-xl font-bold">
          {image.name}
        </div>
        <a href={image.url}>
          <p className="text-wrap text-sm text-gray-400">{image.url}</p>
        </a>
        <form
          action={async () => {
            "use server";

            await deleteImage(image.id);
          }}
        >
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
}

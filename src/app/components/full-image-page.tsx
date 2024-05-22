import { Button } from "~/components/ui/button";
import { deleteImage, getImageById } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImageById(props.id);
  if (!image) return null;

  return (
    <div className="mt-[10vh] flex h-[80vh] w-[99vw] min-w-0 items-center justify-center border-0 text-white max-sm:flex-col sm:flex-row">
      <div className="ml-4 mt-4 flex max-w-[80%] flex-row items-center justify-center rounded-xl shadow-white drop-shadow-lg max-sm:h-[65vh] sm:h-[80vh]">
        <img
          src={image.url}
          alt={image.name}
          loading="lazy"
          className="max-w-[95%] object-contain py-4 max-md:max-h-[55vh] sm:max-h-[75vh]"
        />
      </div>
      <div className="flex w-56 flex-shrink-0 flex-col border-l max-sm:max-h-[30vh] sm:h-full">
        <div className="border-b p-2 text-center text-xl">{image.name}</div>
        <a href={image.url} className="p-2">
          <p className="text-wrap text-sm text-gray-400">{image.url}</p>
        </a>

        <div className="p-2">
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
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "../utils/uploadthing";
import { toast } from "sonner";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    const res = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", res);
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function UploadSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6 hover:scale-x-105"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

function SimpleUploadButton({ ...args }: Input) {
  const router = useRouter();
  const { inputProps, isUploading } = useUploadThingInputProps(
    "imageUploader",
    {
      onUploadBegin() {
        toast.loading("Uploading...", {
          duration: 10000,
          id: "uploading",
        });
      },
      onClientUploadComplete() {
        toast.dismiss("uploading");
        toast.success("Uploaded!");
        router.refresh();
      },
      onUploadError(e) {
        console.log(e);
        toast.dismiss("uploading");
        toast.error("Failed to upload");
      },
    },
  );
  return (
    <div>
      <label htmlFor="upload-btn" className="cursor-pointer">
        <UploadSVG />

        {/* <TextGradient
          text="Upload"
          from="from-red-500"
          to="to-blue-500"
          via="via-green-500"
        /> */}
      </label>
      <input id="upload-btn" type="file" className="sr-only" {...inputProps} />
    </div>
  );
}

export default SimpleUploadButton;

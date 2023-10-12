"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import DropZone from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const UploadDrop = () => {
  const router = useRouter();
  const [isUplaoding, setIsUploading] = useState<boolean>(false);
  const [uploadProgess, setUploadProgress] = useState<number>(0);

  const { startUpload } = useUploadThing("pdfUploader");
  const { toast } = useToast();
  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`)
    },
    retry: true,
    retryDelay: 250,
  });
  const startProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((previousProg) => {
        if (previousProg >= 95) {
          clearInterval(interval);
          // setIsUploading(false);
          return previousProg;
        }
        return previousProg + 10;
      });
    }, 500);
    return interval;
  };

  return (
    <DropZone
      multiple={false}
      onDrop={async (acceptedFiles) => {
        setIsUploading(true);
        const progressInterval = startProgress();
        // file upload progress, wait for progress to be 100
        const response = await startUpload(acceptedFiles);
        if (!response) {
          return toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
        }

        const [fileResponse] = response;
        const key = fileResponse.key;
        if (!key) {
          return toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        clearInterval(progressInterval);
        setUploadProgress(100);
        startPolling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className=" border h-60 m-3 rounded-lg border-dashed border-gray-300"
        >
          <div className="flex items-center justify-center h-full w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className=" flex flex-col items-center justify-center pt-5 pb-5">
                <Cloud className=" h-5 w-5 text-blue-900 mb-3" />
                <p className=" text-sm mb-3 to-zinc-700">
                  <span className=" tracking-widest font-bold">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className=" text-xs text-zinc-400"> PDF (Max size 4MB)</p>
              </div>
              {/* previww */}
              {acceptedFiles && acceptedFiles[0] ? (
                <div className=" max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className=" px-2 py-2 h-full grid place-items-centers">
                    <File className=" h-5 w-5 text-red-600" />
                  </div>
                  <div className="px-2 py-2 h-full text-xs truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}
              {isUplaoding ? (
                <div className=" w-full mt-5 max-w-xs max-auto">
                  <Progress
                    indicatorColor={
                      uploadProgess === 100 ? " bg-green-500" : ""
                    }
                    className=" w-full h-1 bg-zinc-200"
                    value={uploadProgess}
                  />
                  {uploadProgess === 100 ? (
                    <div className=" flex gap-2 items-center justify-center text-xs text-zinc-800 text-center pt-3">
                      <Loader2 className=" h-5 w-5 animate-spin" />
                      Uploading, redirecting to Dashboard
                    </div>
                  ) : null}
                </div>
              ) : null}
              <input
                type="file"
                id="dropzone-file"
                className="hidden"
                {...getInputProps()}
              />
            </label>
          </div>
        </div>
      )}
    </DropZone>
  );
};
const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button> Upload your PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDrop />
      </DialogContent>
    </Dialog>
  );
};
export default UploadButton;

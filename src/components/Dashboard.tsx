"use client";

import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { Ghost, Plus, MessageSquare, Trash,Loader2 } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";

const Dashboard = () => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);
  const utils = trpc.useContext();
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id);
    },
    onSettled() {
      setCurrentlyDeletingFile(null);
    },
  });

  function formatDate(date:Date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  return (
    <main className=" mx-auto max-w-6xl md:p-10">
      <div className=" mt-10 flex flex-col items-start  justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className=" tracking-widest mb-5 font-bold text-3xl text-gray-900 u">
          My Files
        </h1>

        <UploadButton />
      </div>

      {/* display user files */}
      {files && files?.length !== 0 ? (
        <ul className=" mt-10 grid grid-cols-1 gap-5 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                className=" col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
                key={file.id}
              >
                <Link
                  className="flex flex-col gap-3"
                  href={`/dashboard/${file.id}`}
                >
                  <div className=" flex w-full pt-5 px-5 items-center justify-between space-x-5">
                    <div className=" flex shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className=" flex-1 truncate">
                      <div className=" flex first-letter:items-center space-x-5">
                        <h3 className=" text-zinc-900 truncate font-medium">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-3 mt-5 grid grid-cols-3 place-items-center py-3 gap-5 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Plus className="h-5 w-5" />
                    {formatDate(new Date(file.createdAt))}
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-5 w-5" />
                    {file.name.length > 8 ? file.name.substring(0, 9) + '...' : file.name}
                  </div>

                  <Button
                    onClick={() => deleteFile({ id: file.id })}
                    size="sm"
                    className="w-full"
                    variant="destructive"
                  >
                    {currentlyDeletingFile === file.id ? (
                      <Loader2 className='h-5 w-5 animate-spin' />
                    ) : (
                      <Trash className='h-5 w-5' />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <div>
          <Skeleton height={100} className=" my-3" count={5} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 mt-16">
          <Ghost className=" h-10 w-10 text-zinc-800" />
          <h3 className=" font-bold text-lg">No Files here.</h3>
          <p> Lets upload your first PDF</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;

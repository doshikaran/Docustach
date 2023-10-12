"use client";

import { trpc } from "@/app/_trpc/client";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface ChatWrapperProps {
  fileId: string;
}
const ChatWrapper = ({ fileId }: ChatWrapperProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    }
  );

  // loading
  if (isLoading)
    return (
      <div className=" relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-3">
        <div className=" flex-1 flex items-center justify-center flex-col mb-24">
          <div className=" flex flex-col items-center gap-3">
            <Loader2 className=" h-10 w-10 text-blue-800 animate-spin" />
            <h3 className=" font-medium tracking-widest text-lg">Loading</h3>
            <p className=" text-zinc-500 text-sm">Please wait</p>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );

  // processing
  if (data?.status === "PROCESSING")
    return (
      <div className=" relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-3">
        <div className=" flex-1 flex items-center justify-center flex-col mb-24">
          <div className=" flex flex-col items-center gap-3">
            <Loader2 className=" h-10 w-10 text-blue-800 animate-spin" />
            <h3 className=" font-medium tracking-widest text-lg">Processing</h3>
            <p className=" text-zinc-500 text-sm">
              Please wait while we process your request
            </p>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );

  if (data?.status === "FAILED")
    return (
      <div className=" relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-3">
        <div className=" flex-1 flex items-center justify-center flex-col mb-24">
          <div className=" flex flex-col items-center gap-3">
            <XCircle className=" h-10 w-10 text-red-600 " />
            <h3 className=" font-medium tracking-widest text-lg">
              Too many pages
            </h3>
            <p className=" text-zinc-500 text-sm">
              Your <span className=" uppercase font-extrabold"> free</span> plan
              supports upto 15 pages per pdf
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "secondary",
                className: " mt-3",
              })}
            >
              {" "}
              <ChevronLeft className=" h-3 w-3 mr-2" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );

  return (
    <div className=" relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-3 ">
      <div className=" flex-1 justify-between flex flex-col mb-24">
        <Messages />
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatWrapper;

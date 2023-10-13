import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Home() {
  const { getUser,isAuthenticated } = getKindeServerSession();
  const user = getUser();
  return (
    <>
      <MaxWidthWrapper className=" mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        
        <div className=" max-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className=" text-xs uppercase tracking-wider font-semibold text-gray-800">
            {" "}
            DocuStash is ready for you
          </p>
        </div>

        <h1 className=" max-w-3xl text-3xl font-bold md:text-4xl lg:text-5xl">
          Connect with your <span className=" text-blue-600">Documents.</span>
        </h1>
        <p className=" mt-5 max-w-prose text-zinc-700 sm:text-lg">
          {" "}
          DocuStash allows you to connect with your documents.
        </p>

        {/* get started */}
        { isAuthenticated() ? (
            <Link
            className={buttonVariants({
              size: 'lg',
              className: 'mt-5',
            })}
            href='/dashboard'
            target='_blank'>
            Your Files{' '}
            <ArrowRight className='ml-2 h-5 w-5' />
          </Link>
        ): (
          <div className=" bg-zinc-200 mt-5 p-3 rounded-md">
            <h1 className=" tracking-widest text-sm font-bold">Welcome to DocuStash. Please sign in.</h1>
          </div>
        )}
       
      </MaxWidthWrapper>

      {/* TODO: Add more */}
      <div>
        <div className=" relative isolate ">
          <div
            aria-hidden="true"
            className=" -top-40 -z-10 pointer-events-none absolute inset-x-0 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className=" relative left-[calc(50%-10rem)] aspect-[1155/670] w-[36.125rem] -translate-x-1/2 rotate-[30deg]
             bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.250rem]
            "
            />
          </div>

          <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/preview.png'
                    alt='product preview'
                    width={1350}
                    height={850}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className=" -top-40 -z-10 pointer-events-none absolute inset-x-0 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className=" relative left-[calc(50%-10rem)] aspect-[1155/670] w-[36.125rem] -translate-x-1/2 rotate-[30deg]
             bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.250rem]
            "
            />
          </div>
        </div>
      </div>

      {/* features */}
      <div className=" mx-auto mb-32 mt-32 max-w-5xl sm:mt-52">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              {" "}
              Upload your documents and keep them secured with DocuStash.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Uploading your PDF files has never been easier than with DocuStash.
            </p>
          </div>
        </div>

        {/* basic steps */}
        <ol className="my-10 space-y-5 pt-10 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-2 text-zinc-700">
                Start with our free plan.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="text-xl font-semibold">
                Upload your PDF file
              </span>
              <span className="mt-2 text-zinc-700">
                We&apos;ll process your file and make it ready for you to view it and read it.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="text-xl font-semibold">
                More Features
              </span>
              <span className="mt-2 text-zinc-700">
               Upload - View Pdfs - Edit Pdfs
              </span>
            </div>
          </li>
        </ol>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/upload.png"
                alt="upload"
                width={1350}
                height={850}
                quality={100}
                className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

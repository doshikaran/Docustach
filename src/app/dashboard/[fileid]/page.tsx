import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: {
    fileid: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { fileid } = params;
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`);
  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <div className=" flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)] ">
      <div className=" mx-auto w-full max-w-5xl grow lg:flex xl:p-3">
        {/* left hand side */}
        <div className=" flex-1 xl:flex">
            <div className=" px-5 py-5 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
    
            </div>
        </div>
      </div>
    </div>
  );
};
export default Page;

import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  // Re-fetch session when user create username successfully
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  console.log("HERE IS THE SESSION", session);
  return (
    <div className="dark:bg-slate-900 bg-white relative h-screen text-black dark:text-white transition duration-500">
      {session?.user?.username ? (
        <Chat session={session}/>
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}

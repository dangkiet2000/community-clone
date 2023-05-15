import { Session } from "next-auth";
import ConversationList from "./ConversationList";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  return (
    <div className="md:w-[400px] w-full bg-slate-800 py-6 px-3">
      {/*Skeleton loader */}
      <ConversationList session={session} />
    </div>
  );
};
export default ConversationsWrapper;

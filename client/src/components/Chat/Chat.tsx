import React from "react";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import FeedWrapper from "./Feed/FeedWrapper";
import { Session } from "next-auth";

interface ChatProps {
  session: Session;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  return (
    <div className="flex h-[100vh]">
      <ConversationsWrapper session={session} />
      <FeedWrapper session={session} />
    </div>
  );
};
export default Chat;

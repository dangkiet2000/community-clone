import { Session } from "next-auth";
import ConversationModal from "./Modal/Modal";
import { useState } from "react";

interface ConversationListProps {
  session: Session;
}

const ConversationList: React.FC<ConversationListProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full">
      <div
        onClick={onOpen}
        className="flex items-center justify-center bg-slate-700 py-[6px] cursor-pointer rounded-md mb-4 hover:text-gray-200 text-gray-300"
      >
        <span className="font-medium">Find or start a conversation</span>
      </div>
      <ConversationModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};
export default ConversationList;

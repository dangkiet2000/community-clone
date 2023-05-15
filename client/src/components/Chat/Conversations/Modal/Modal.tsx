import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import UsersOperations from "@/graphql/operations/user";
import { SearchUsersData, SearchUsersInput } from "@/utils/types";
import UserSearchList from "./UserSearchList";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UsersOperations.Queries.searchUsers);

  if (!isOpen) return null;

  const onSearchUsers = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers({ variables: { username: username } });
  };

  return (
    <div className="fixed flex items-start justify-center bg-neutral-800/30 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className={`max-w-[450px] max-h-full w-full mt-[50px]`}>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 py-4 px-6">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg text-slate-300">
              Create a Conversation
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <form onSubmit={onSearchUsers}>
            <div className="flex flex-col gap-4 mt-4">
              <Input
                type="text"
                placeholder="Enter a username"
                value={username}
                setValue={setUsername}
                className="bg-slate-800/50 h-12"
              />
              <Button
                label="Search"
                type="submit"
                className="bg-slate-800/50 hover:bg-slate-800/80"
                disabled={!username}
                loading={loading}
              />
            </div>
          </form>
          {data?.searchUsers && <UserSearchList users={data?.searchUsers} />}
        </div>
      </div>
    </div>
  );
};

export default Modal;

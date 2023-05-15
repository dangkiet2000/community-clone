import Avatar from "@/components/Common/Avatar";
import Button from "@/components/Common/Button";
import { SearchedUser } from "@/utils/types";

interface UserSearchListProps {
  users: Array<SearchedUser>;
}

const UserSearchList: React.FC<UserSearchListProps> = ({ users }) => {
  return (
    <>
      {users.length === 0 ? (
        <h5 className="font-semibold mt-4 text-lg text-center">
          No Users Found
        </h5>
      ) : (
        <div className="w-full mt-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between w-full py-3 px-2 rounded-md hover:bg-slate-600"
            >
              <div className="flex items-center gap-4">
                <Avatar />
                <div className="text-medium text-slate-400">
                  {user.username}
                </div>
              </div>
              <Button
                label="Select"
                className="bg-slate-800/50 rounded-md"
                onClick={() => {}}
              />
            </div>
          ))}
        </div>  
      )}
    </>
  );
};
export default UserSearchList;

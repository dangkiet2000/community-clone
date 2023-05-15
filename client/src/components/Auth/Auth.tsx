import { Session } from "next-auth";
import React, { useState } from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useMutation } from "@apollo/client";
import UserOperations from "@/graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "@/utils/types";
import { toast } from "react-hot-toast";

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const [createUsername, { error, loading }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;

    try {
      const { data } = await createUsername({ variables: { username } });

      if (data?.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }

      //  Reload session to obtain new username
      reloadSession();

      // Toast
      toast.success("Create username successfully");
    } catch (error: any) {
      toast.error(error?.message);
      console.log("onSubmit error", error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8 dark:bg-slate-800 h-[40vh] rounded-md shadow-sm px-10">
        {session ? (
          <>
            <span className="text-xl font-semibold">Create a Username</span>
            <Input
              value={username}
              setValue={setUsername}
              placeholder="Enter a username"
              type="text"
              className="bg-slate-700 h-12"
            />
            <Button
              className="w-full"
              label="Save"
              onClick={onSubmit}
              loading={loading}
              disabled={loading}
            ></Button>
          </>
        ) : (
          <>
            <span className="text-xl font-semibold">Messenger QL</span>
            <Button
              icon={FcGoogle}
              label="Continue with google"
              onClick={() => signIn("google")}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default Auth;

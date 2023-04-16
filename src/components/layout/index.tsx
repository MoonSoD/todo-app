import { FC } from "react";
import { useRouter } from "next/router";

export const Layout: FC = ({ children }) => {
  const router = useRouter();

  const title = () => {
    if (router.route === "index") return "ToDo App";
    if (router.route === "items") return "Item";
  };

  return (
    <div className="bg-background w-screen h-screen">
      <div className="mx-auto w-full md:w-list h-full flex flex-col justify-end">
        <h1 className="text-4xl font-bold ml-5">Item</h1>
        <div className="bg-white mx-auto w-full h-5/6 overflow-y-auto shadow-xl rounded-md p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

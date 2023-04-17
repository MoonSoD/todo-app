import { FC } from "react";
import Link from "next/link";

interface Props {
  title: string;
  hasBackButton?: boolean;
}

export const Layout: FC<Props> = ({ title, hasBackButton, children }) => {
  return (
    <div className="bg-background w-screen h-screen">
      <div className="mx-auto w-full md:w-list h-full flex flex-col justify-end">
        <div className="flex justify-between items-end">
          {hasBackButton ? (
            <Link href="/">
              <button className="text-lg font-medium">👈 go back</button>
            </Link>
          ) : (
            <div />
          )}
          <h1 className="text-4xl font-bold ml-5">{title}</h1>
        </div>
        <div className="bg-white mx-auto w-full h-5/6 overflow-y-auto shadow-xl rounded-md p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

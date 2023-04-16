import { FC } from "react";

export const Grid: FC = ({ children }) => {
  return <div className="grid grid-cols-1 gap-4">{children}</div>;
};

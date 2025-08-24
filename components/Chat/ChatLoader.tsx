import { FC } from "react";
import SvgIcon from "../Core/SvgIcon";

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div className="flex flex-col flex-start">
      <div
        className="flex items-center bg-neutral-200 text-neutral-900 rounded-2xl px-4 py-2 w-fit"
        style={{ overflowWrap: "anywhere" }}
      >
        <SvgIcon
          src="/Icon.svg"   // put dots.svg in /public/icons/
          size={24}
          className="animate-pulse"
        />
      </div>
    </div>
  );
};

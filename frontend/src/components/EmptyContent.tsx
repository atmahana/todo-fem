import { FC } from "react";

const EmptyContent: FC = () => {
  return (
    <div className="bg-foreground rounded-md p-5 text-muted text-sm md:text-base shadow-sm">
      No task(s) available
    </div>
  );
};

export default EmptyContent;

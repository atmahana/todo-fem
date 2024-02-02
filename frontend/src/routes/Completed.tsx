import { FC } from "react";
import { useAuth } from "@clerk/clerk-react";
import Loader from "../components/Loader";
import Content from "../components/Content";

interface CompletedPageProps {}

const CompletedPage: FC<CompletedPageProps> = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }

  if (!isSignedIn) {
    return (
      <div className="bg-foreground grid divide-y-2 rounded-md p-5 text-sm text-muted shadow-sm">
        No task(s) available
      </div>
    );
  }

  return <Content type="completed" />;
};

export default CompletedPage;

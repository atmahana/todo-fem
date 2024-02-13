import { FC } from "react";
import { useAuth } from "@clerk/clerk-react";
import Loader from "../components/Loader";
import Content from "../components/Content/Content";
import EmptyContent from "../components/EmptyContent";

interface CompletedPageProps {}

const CompletedPage: FC<CompletedPageProps> = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }

  if (!isSignedIn) {
    return <EmptyContent />;
  }

  return <Content type="completed" />;
};

export default CompletedPage;

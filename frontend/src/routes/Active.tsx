import { FC } from "react";
import { useAuth } from "@clerk/clerk-react";
import Loader from "../components/Loader";
import Content from "../components/Content/Content";
import EmptyContent from "../components/EmptyContent";

interface ActivePageProps {}

const ActivePage: FC<ActivePageProps> = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }

  if (!isSignedIn) {
    return <EmptyContent />;
  }

  return <Content type="active" />;
};

export default ActivePage;

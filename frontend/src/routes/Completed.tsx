import { FC } from "react";
import { Content } from "../components/Content";

interface CompletedPageProps {}

const CompletedPage: FC<CompletedPageProps> = () => (
  <Content type="completed" />
);

export default CompletedPage;

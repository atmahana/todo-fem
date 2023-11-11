import { FunctionComponent } from "react";
import { Content } from "../components/Content";

interface CompletedPageProps {}

const CompletedPage: FunctionComponent<CompletedPageProps> = () => (
  <Content type="completed" />
);

export default CompletedPage;

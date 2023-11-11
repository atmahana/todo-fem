import { FunctionComponent } from "react";
import { Content } from "../components/Content";

interface ActivePageProps {}

const ActivePage: FunctionComponent<ActivePageProps> = () => (
  <Content type="active"/>
);

export default ActivePage;

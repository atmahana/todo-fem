import { FC } from "react";
import { Content } from "../components/Content";

interface ActivePageProps {}

const ActivePage: FC<ActivePageProps> = () => (
  <Content type="active"/>
);

export default ActivePage;

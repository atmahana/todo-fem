import { FunctionComponent } from "react";
import { Content } from "../components/Content";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => (
  <Content type="all" />
);

export default HomePage;

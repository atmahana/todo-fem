import { FC } from "react";
import { Content } from "../components/Content";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => (
  <Content type="all" />
);

export default HomePage;

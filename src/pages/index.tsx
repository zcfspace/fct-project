import Layout from "../components/Frontend/layout";
import Testimonial from "../components/Frontend/testimonial";
import Banner from "../components/Frontend/banner";

const Home: React.FC = () => {
  return (
    <Layout>
      <Banner />
      <Testimonial />
    </Layout>
  );
};
export default Home;

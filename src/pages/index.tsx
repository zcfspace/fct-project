import Layout from "../components/Frontend/layout";
import Testimonial from "../components/Frontend/testimonial";
import Banner from "../components/Frontend/banner";
import Gallery from "../components/Frontend/gallery";

const Home: React.FC = () => {
  return (
    <Layout>
      <Banner />
      <Gallery />
      <Testimonial />
    </Layout>
  );
};
export default Home;

import Layout from "../components/Frontend/layout";
import Testimonial from "../components/Frontend/testimonial";
import Banner from "../components/Frontend/banner";
import Gallery from "../components/Frontend/gallery";
import { motion } from 'framer-motion'

const Home: React.FC = () => {
  return (
    <Layout>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <Banner />
      </motion.div>
      <Gallery />
      <Testimonial />
    </Layout>
  );
};
export default Home;

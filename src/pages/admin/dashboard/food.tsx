import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';
import CreateFood from '@/components/Backend/createFood';

function FoodPage() {
  return (
    <Layout>
      <div>
        <CreateFood />
      </div >
    </Layout>
  );
}

export default withAdminAuth(FoodPage);
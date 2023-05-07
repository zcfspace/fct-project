import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';

function CategoryPage() {
  return (
    <Layout>
      <div>
        <h1>Category</h1>
      </div >
    </Layout>
  );
}

export default withAdminAuth(CategoryPage);
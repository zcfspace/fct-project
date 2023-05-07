import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';

function OrderPage() {
  return (
    <Layout>
      <div>
        <h1>Order</h1>
      </div >
    </Layout>
  );
}

export default withAdminAuth(OrderPage);
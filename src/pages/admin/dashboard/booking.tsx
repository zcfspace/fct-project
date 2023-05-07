import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';

function BookingPage() {
  return (
    <Layout>
      <div>
        <h1>Booking</h1>
      </div >
    </Layout>
  );
}

export default withAdminAuth(BookingPage);
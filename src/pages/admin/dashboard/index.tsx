import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';

function DashboardPage() {
  return (
    <Layout>
      <div >
        <h1>Dashboard</h1>
      </div>
    </Layout>
  )
}

export default withAdminAuth(DashboardPage);
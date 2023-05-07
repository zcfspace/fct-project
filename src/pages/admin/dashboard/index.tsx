import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';

function DashboardPage() {
  return (
    <Layout>
      <div className='mb-96'>
        <h1>Dashboard</h1>
      </div>
      <p className='pt-96'>HOLA ...</p>
    </Layout>
  )
}

export default withAdminAuth(DashboardPage);
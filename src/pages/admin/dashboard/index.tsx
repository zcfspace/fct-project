import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';
import BarChart from '@/components/Backend/barChart';
import TopCards from '@/components/Backend/topCards';
import RecentOrders from '@/components/Backend/recentOrders';

function DashboardPage() {
  return (
    <Layout>
      <TopCards />
      <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
        <BarChart />
        <RecentOrders />
      </div>
    </Layout>
  )
}

export default withAdminAuth(DashboardPage);
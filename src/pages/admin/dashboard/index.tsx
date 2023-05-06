import withAdminAuth from '../../../components/Backend/withAdminAuth';

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default withAdminAuth(DashboardPage);
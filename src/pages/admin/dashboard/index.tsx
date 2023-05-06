import withAdminAuth from '../../../components/Backend/withAdminAuth';
import { Toaster, toast } from 'sonner'

function DashboardPage() {
  return (
    <div>
      <Toaster richColors />
      <h1>Dashboard</h1>
    </div>
  );
}

export default withAdminAuth(DashboardPage);
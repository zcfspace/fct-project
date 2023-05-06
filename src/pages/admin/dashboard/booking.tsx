import withAdminAuth from '../../../components/Backend/withAdminAuth';

function BookingPage() {
  return (
    <div>
      <h1>Booking</h1>
    </div>
  );
}

export default withAdminAuth(BookingPage);
import withAdminAuth from '../../../components/Backend/withAdminAuth';

function FoodPage() {
  return (
    <div>
      <h1>Food</h1>
    </div>
  );
}

export default withAdminAuth(FoodPage);
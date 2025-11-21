const OrderList = () => {
  return <div>Order List Component</div>;
};

export const PartnerDashboard = () => {
  return (
    <>
      <h1 className="text-2xl font-medium text-black mb-7">Dashboard</h1>
      <div className="bg-white rounded-4xl p-4">
        <OrderList />
      </div>
    </>
  );
};

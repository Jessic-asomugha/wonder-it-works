
import { HealthTips } from "@/components/HealthTips";
import { MainLayout } from "@/components/MainLayout";

const HealthTipsPage = () => {
  // Mock user data
  const userData = {
    diabetesType: "Type 2",
  };
  
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Health Tips & Recommendations</h1>
      <HealthTips diabetesType={userData.diabetesType} />
    </MainLayout>
  );
};

export default HealthTipsPage;


import { GlucoseMonitor } from "@/components/GlucoseMonitor";
import { MainLayout } from "@/components/MainLayout";

const GlucoseMonitoringPage = () => {
  // Mock user data
  const userData = {
    diabetesType: "Type 2",
  };
  
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Glucose Monitoring</h1>
      <GlucoseMonitor diabetesType={userData.diabetesType} />
    </MainLayout>
  );
};

export default GlucoseMonitoringPage;

import { Route, Routes } from "react-router-dom";
import VehicleSalesListPage from "./pages/VehicleSalesListPage";

const VehicleSalesRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<VehicleSalesListPage />} />
      {/* <Route path=":id" element={<VehicleSaleDetailsPage />} />
      <Route path="add" element={<AddEditVehicleSalePage />} />
      <Route path="edit/:id" element={<AddEditVehicleSalePage />} /> */}
    </Routes>
  );
};

export default VehicleSalesRouter;

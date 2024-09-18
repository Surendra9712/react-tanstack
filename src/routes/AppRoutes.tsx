import AuthenticationPage from "@/auth/page";
import NotFoundPage from "@/components/common/NotFoundPage";
import LayoutWrapper from "@/components/common/layout-wrapper";
import VehicleSalesRouter from "@/modules/vehicle_sales/VehicleSalesRouter";
import {Route, Routes, Navigate} from "react-router-dom";
import CommissionComponent from "@/components/Commission/CommissionComponent";
import PolicyComponent from "@/components/Policy/PolicyComponent";
import SalesLog from "@/components/SalesLog/SalesLogComponent";
import DocumentUploadPage from "@/modules/documents/components/document-upload";
import DocumentManager from "@/modules/documents/components/document-manager";
import SalesPlanComponent from "@/components/SalesPlan/SalesPlanComponent";
import useAuth from "@/hooks/use-auth";
import Dashboard from "@/modules/dashboard/components/dashboard";
import PolicyDetail from "@/components/Policy/PolicyDetail";
import EmployeesListComponent from "@/components/Employees/EmployeesListComponent";
import AdminWrapper from "@/auth/components/AdminWrapper";
import SalesManagerWrapper from "@/auth/components/SalesManagerWrapper";
import AdminOrSalesManagerWrapper from "@/auth/components/AdminOrSalesManagerWrapper";
import ReportComponent from "@/components/Report/ReportComponent";

//IMPORTANT NOTE: When making routes the breadcrumb component takes into acccount "-"
//and will parse and capitalize letters from the route so be mindful of the format - valid routes e.g. policy, sales-log

const AppRoutes: React.FC = () => {
    // You can replace `true` with your actual authentication state logic.
    const isAuthenticated = true;
    // You can replace `true` with your actual authorization state logic.
    const {isAdmin} = useAuth();

    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/"
                element={
                    isAuthenticated ? (
                        <>
                            <LayoutWrapper>
                                <Dashboard/>
                            </LayoutWrapper>
                        </>
                    ) : (
                        <Navigate to="/login"/>
                    )
                }
            />

            <Route
                path="/document-manager"
                element={
                    isAuthenticated ? (
                        <LayoutWrapper>
                            <DocumentManager/>
                        </LayoutWrapper>
                    ) : (
                        <Navigate to="/login" replace/>
                    )
                }
            />
            <Route
                path="/commission"
                element={
                    isAuthenticated ? (
                        <LayoutWrapper>
                            <CommissionComponent/>
                        </LayoutWrapper>
                    ) : (
                        <Navigate to="/login" replace/>
                    )
                }
            />
            <Route
                path="/sales-log"
                element={
                    isAuthenticated ?
                        (<LayoutWrapper>
                            <SalesManagerWrapper>
                                <SalesLog/>
                            </SalesManagerWrapper>
                        </LayoutWrapper>
                    ) : (
                        <Navigate to="/login" replace/>
                    )
                }
            />
            <Route
                path="/policy/category/:categoryId"
                element={
                    isAuthenticated ? (
                        <LayoutWrapper>
                            <PolicyComponent/>
                        </LayoutWrapper>
                    ) : (
                        <Navigate to="/login" replace/>
                    )
                }
            />
            <Route
                path="/policy/category/:categoryId/:policyId"
                element={
                    isAuthenticated ? (
                        <LayoutWrapper>
                            <PolicyDetail/>
                        </LayoutWrapper>
                    ) : (
                        <Navigate to="/login" replace/>
                    )
                }
            />
            <Route
                path="/employees"
                element={
                    isAuthenticated ? (
                        <LayoutWrapper>
                            <AdminOrSalesManagerWrapper>
                                <EmployeesListComponent/>
                            </AdminOrSalesManagerWrapper>
                        </LayoutWrapper>
                    ) : (
                        <Navigate to="/login" replace/>
                    )
                }
            />
            <Route
                path="/sales-plans"
                element={
                    isAuthenticated ? (
                        <LayoutWrapper>
                            <AdminWrapper>
                                <SalesPlanComponent/>
                            </AdminWrapper>
                        </LayoutWrapper>
                    ) : (
                        <Navigate to="/login" replace/>
                    )
                }
            />
            <Route
                path="/docs"
                element={
                    isAuthenticated ? (
                        <LayoutWrapper>
                            <DocumentUploadPage/>
                        </LayoutWrapper>
                    ) : (
                        <Navigate to="/login" replace/>
                    )
                }
            />
            <Route
                path="/login"
                element={
                    isAuthenticated ? <Navigate to="/" replace/> : <AuthenticationPage/>
                }
            />

            {/* Private Routes */}
            {/* <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        /> */}

            {/* Vehicle Sales Module */}
            <Route
                path="/vehicle-sales/*"
                element={
                    isAuthenticated ? (
                        <LayoutWrapper>
                            <VehicleSalesRouter/>
                        </LayoutWrapper>
                    ) : (
                        <Navigate to="/login" replace/>
                    )
                }
            />
            <Route
                path="/report"
                element={
                    isAuthenticated ? (
                        <LayoutWrapper>
                            <ReportComponent/>
                        </LayoutWrapper>
                    ) : (
                        <Navigate to="/login" replace/>
                    )
                }
            />

            {/* Catch-All Route for 404 */}
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default AppRoutes;

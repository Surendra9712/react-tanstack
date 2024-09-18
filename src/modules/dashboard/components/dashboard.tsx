import CommissionsChart from "@/components/Commission/CommissionsChart";
import RecentPolicies from "@/components/Policy/RecentPolicies";
import RecentSalesChart from "@/components/SalesLog/RecentSalesChart";
import RecentDocuments from "@/modules/documents/components/recent-documents";
import setPageTitle from "@/hooks/setPageTitle";
import {Card} from "@/components/ui/card";

function Dashboard() {
    setPageTitle('Dashboard');
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 gap-4">
            <CommissionsChart/>
            <Card className="hidden lg:flex flex-col gap-3 border">
                <RecentPolicies/>
            </Card>
            <RecentSalesChart/>
            <Card className="flex lg:hidden flex-col gap-3 border">
                <RecentPolicies/>
            </Card>
            <RecentDocuments/>
        </div>
    );
}

export default Dashboard;

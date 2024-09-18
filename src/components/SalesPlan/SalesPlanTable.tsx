import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
} from "../ui/table";
import {ISalesPlanTable} from "@/interfaces/ISalesPlanTable";

const SalesPlanTable: React.FC<ISalesPlanTable> = ({
                                                       salesPlans,
                                                       onPlanClick,
                                                   }) => {
    return (
        <Table height="md:max-h-[calc(100vh-214px)] max-h-[calc(100vh-200px)]">
            <TableHeader className="sticky top-0">
                <TableRow className="!border-b-0">
                    <TableHead className='md:w-[30%] w-[50%]'>Plan Type</TableHead>
                    <TableHead>Plan Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {salesPlans.map((salesPlan) => (
                    <TableRow
                        key={salesPlan.id}
                        className="cursor-pointer"
                        onClick={() => onPlanClick(salesPlan.id)}
                    >
                        <TableCell className='md:w-[30%] w-[50%]'>{salesPlan.logicApp?.name}</TableCell>
                        <TableCell>
                            <p  className="line-clamp-4">{salesPlan.description}</p>
                        </TableCell>
                        {/* <TableCell>{participants.length}</TableCell> */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default SalesPlanTable;

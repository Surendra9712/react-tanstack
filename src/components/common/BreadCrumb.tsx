import React from "react";
import {Link, useLocation, useParams, useSearchParams} from "react-router-dom";
import {Icons} from "@/components/icons";
import {Label} from "@/components/ui/label";
import {ChevronRightIcon, FileIcon} from "@radix-ui/react-icons"
export const capitalizeAndReplace = (text: string): string => {
    const path = text.split("/")[0];
    const pathname = path.includes('policy') ? 'policies' : path;
    return pathname
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const icon = (path: string) => {
    switch (path) {
        case 'document-manager':
            return Icons.folder();
        case 'commission':
            return Icons.moneyCalculator();
        case 'policy/category/1':
        case 'policy/category/2':
        case 'policy/category/3':
        case 'policy/category/4':
            return Icons.clipboardTask();
        case 'sales-log':
            return Icons.arrowGrowth();
        case 'employees-list':
            return Icons.peopleTeam()
        case 'report':
            return Icons.dataPie()
        default:
            return Icons.dataTrending()
    }
}

const BreadCrumb: React.FC = () => {
    const {policyId} = useParams();
    const [searchParams] = useSearchParams();
    const path = useLocation().pathname.substring(1);
    const newPath = policyId ? path.replace(`/${policyId}`, "") : path;
    return (
        <>
            <nav aria-label="Breadcrumb">
                <ol className="inline-flex items-center">
                    <Link to="/"
                          className="inline-flex gap-2 py-1 px-2 text-200 items-center font-medium text-body-sm hover:text-primary">
                        <span>{Icons.home()}</span>
                        <span>Home</span>
                    </Link>
                    {path !== '' &&
                        <div className="flex items-center">
                            <div><ChevronRightIcon color={'currentColor'} className="h-4 w-4"/></div>
                            <Link to={`/${newPath}`}
                                  className={`inline-flex gap-2 px-2 py-1 items-center font-medium text-body-sm hover:text-primary ${policyId ? "text-200" : "text-100"}`}>
                                {icon(newPath)}
                                {capitalizeAndReplace(newPath)}
                            </Link>
                            {policyId && <Label
                                weight="medium"
                                size="sm"
                                className="inline-flex gap-1 py-1 items-center hover:text-primary text-100">
                                <div><ChevronRightIcon className="h-4 w-4" color={'currentColor'}/></div>
                                <div><FileIcon className="w-4 h-4"/></div>
                                <span className="line-clamp-1">{searchParams.get('title')}</span>
                            </Label>}
                        </div>
                    }
                </ol>
            </nav>
        </>
    );
};

export default BreadCrumb;
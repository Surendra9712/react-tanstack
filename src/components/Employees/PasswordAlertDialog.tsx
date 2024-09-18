import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "../ui/alert-dialog";
import {toast} from "@/components/ui/use-toast";

export default function PasswordAlertDialog({
  open,
  onChange,
  password,
}: {
  open: boolean;
  onChange: (open: boolean) => void;
  password: string;
}) {
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast({title:"Password copied to clipboard!"});
      //onClose(); // Optionally close the dialog after copying
    });
  };

  return (
    <AlertDialog defaultOpen={true} open={open} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Password</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="flex items-center space-x-2">
            <Input
              className="w-1/2 text-sm"
              readOnly
              type="text"
              value={password}
            />
            <Button onClick={handleCopyPassword} variant="outline">
              Copy
            </Button>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-transparent border border-gray-500 hover:bg-gray-translucent">Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

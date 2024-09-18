import { Label } from "../ui/label";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

const ParameterExampleDialog = ({
  selectedPlanSchema,
}: {
  selectedPlanSchema: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="float-right text-blue-500 px-4 py-2 rounded"
          style={{
            fontFamily: "Roboto",
            fontWeight: 800,
            letterSpacing: "1px",
          }}
        >
          Parameter Example
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px] max-w-[800px] max-h-[80vh] p-4 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Parameters should appear like this:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <Label className="text-gray-500">Json Format:</Label>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <pre className="text-xs leading-snug whitespace-pre-wrap">
                {selectedPlanSchema
                  ? JSON.stringify(JSON.parse(selectedPlanSchema), null, 2)
                  : "Empty string"}
              </pre>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ParameterExampleDialog;

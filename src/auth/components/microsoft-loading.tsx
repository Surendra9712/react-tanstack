import { Icons } from "@/components/icons";
import { Card } from "@/components/ui/card";

const MicrosoftLoginLogoutPanel = () => {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      <h6 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Logging in to Microsoft Azure Active Directory
      </h6>
    </Card>
  );
};

export default MicrosoftLoginLogoutPanel;

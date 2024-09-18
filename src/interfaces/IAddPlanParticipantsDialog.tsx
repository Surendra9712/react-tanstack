import Employee from "@/types/Employee";

export interface IAddPlanParticipantsDialog {
  planParticipants?: Employee[];
  participantRef?: React.RefObject<HTMLSpanElement>;
}

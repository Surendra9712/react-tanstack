import { IUseSalesPlans } from "../interfaces/IUseSalesPlans";
import { useApi } from "../hooks/use-api";
import {
  GETSALESPLANSMAIN_ENDPOINT,
  GETPARTICIPANTS_ENDPOINT,
  GETPLANTYPES_ENDPOINT,
  GETELLIGABLEPARTICIPANTS_ENDPOINT,
  DELETEPLANPARTICIPANT_ENDPOINT,
  UPDATESALESPLAN_ENDPOINT,
  CREATENEWFROM_ENDPOINT,
  SAVEPARTICIPANTS_ENDPOINT,
  ADD_PARTICIPANT_ENDPOINT,
} from "../api-config";

const useSalesPlans = (): IUseSalesPlans => {
  const { get: GetSalesPlans } = useApi({
    endpoint: GETSALESPLANSMAIN_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { get: GetParticipants } = useApi({
    endpoint: GETPARTICIPANTS_ENDPOINT,
    includeParamsInUrl: true,
  });
  const { post: AddPlanParticipant } = useApi({
    endpoint: ADD_PARTICIPANT_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { get: GetElligableParticipants } = useApi({
    endpoint: GETELLIGABLEPARTICIPANTS_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { get: GetPlanTypes } = useApi({
    endpoint: GETPLANTYPES_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { post: DeletePlanParticipant } = useApi({
    endpoint: DELETEPLANPARTICIPANT_ENDPOINT,
    includeParamsInUrl: true,
  });
  const { post: UpdateSalesPlan } = useApi({
    endpoint: UPDATESALESPLAN_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { post: SaveParticipants } = useApi({
    endpoint: SAVEPARTICIPANTS_ENDPOINT,
    includeParamsInUrl: true,
  });
  const { post: CreateNewFrom } = useApi({
    endpoint: CREATENEWFROM_ENDPOINT,
    includeParamsInUrl: false,
  });

  return {
    GetSalesPlans,
    GetParticipants,
    GetPlanTypes,
    SaveParticipants,
    AddPlanParticipant,
    GetElligableParticipants,
    DeletePlanParticipant,
    UpdateSalesPlan,
    CreateNewFrom,
  };
};

export default useSalesPlans;

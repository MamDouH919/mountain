const ClientsType = {
    syndicates: 'syndicates',
    healthcareCompanies: 'healthcareCompanies',
    discountContractCompanies: 'discountContractCompanies',
    contractingCompanies: 'contractingCompanies',
} as const;

type ClientsTypeType = typeof ClientsType[keyof typeof ClientsType];

export const clientsTypeArray: ClientsTypeType[] = Object.values(ClientsType);

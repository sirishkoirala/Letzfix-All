export interface Appointment {
   id: number;
   date: string;
   time: string;
   customerId: string;
   storeId: string;
   deviceModelId: string;
   faultId: string;
   createdAt: string;
   customer: {
      id: string;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
   };
   store: {
      id: string;
      name: string;
   };
   deviceModel: {
      id: string;
      name: string;
   };
   fault: {
      id: string;
      name: string;
   };
   isArchived: boolean;
}

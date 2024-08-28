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
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
   };
   store: {
      name: string;
   };
   deviceModel: {
      name: string;
   };
   fault: {
      name: string;
   };
}

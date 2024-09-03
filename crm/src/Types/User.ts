export interface User {
   id: number;
   firstName: string;
   lastName: string;
   storeId: number;
   isVerified: boolean;
   isActive: boolean;
   store: {
      id: number;
      name: string;
   };
}

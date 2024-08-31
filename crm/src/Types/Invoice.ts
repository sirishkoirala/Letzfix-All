import { Store } from "antd/es/form/interface";
import { Appointment } from "./Appointment";
import { Customer } from "./Customer";
import { Fault } from "./Fault";

export interface InvoiceItem {
   id: number;
   faultId: number;
   amount: number;
   tax: number;
   invoiceId: number;
   fault?: Fault; 
   invoice?: Invoice; 
}

export interface Invoice {
   id: number;
   invoiceNumber: string;
   invoiceDate: string;
   invoiceDueDate: string;
   appointmentId: number;
   customerId: number;
   storeId: number;
   invoiceItems?: InvoiceItem[]; 
   appointment?: Appointment; 
   customer?: Customer; 
   store?: Store; 
}

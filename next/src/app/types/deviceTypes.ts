export interface DeviceModel {
   model_id: string;
   name: string;
   url: string;
}

export interface Device {
   id: string;
   name: string;
   image: string;
   url: string;
   models?: DeviceModel[]; 
}

import {Client} from '../app/client';

export class Project {
      _id:string;
     title: string;
     description: string;
     repository: string;
     client: Client= new Client();
     start_date:Date;
     ending_date:Date;
     technologies:string[];
     budget:number;


}

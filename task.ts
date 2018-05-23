import {Project} from '../app/project';
import {User} from '../app/user';
import {Activity} from '../app/activity';

export class Task
{
_id:string;
name: string;
details: string;
project: Project;
state: string="backlog";
user: Array<User>;
start_date: Date;
end_date: Date;
estimated_time: number;
activities:Array<Activity>=new Array<Activity>();

}

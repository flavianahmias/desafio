export class TaskDTO {
    id: number;
    title: string;
    description: string;
    status: number
    createdAt?: Date;
    updatedAt?: Date;
}
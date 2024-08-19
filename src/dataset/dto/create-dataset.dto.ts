export class CreateDatasetDto {
    readonly name: string;
    readonly description: string;
    data: string;
    readonly metadata: string;
    readonly userId: number = 1;
}

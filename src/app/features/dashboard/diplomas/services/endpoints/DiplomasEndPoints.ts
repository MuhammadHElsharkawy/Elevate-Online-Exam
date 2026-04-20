import { environment } from "../../../../../../environment/environment.development";

export class DiplomasEndPoints {
    static readonly GetAllDiplomas = `${environment.baseUrl}/api/diplomas`;
    static readonly CreateNewDiploma = `${environment.baseUrl}/api/diplomas`;
    static readonly GetUpdateDeleteDiplomaById = (diplomaId: string) => `${environment.baseUrl}/api/diplomas/${diplomaId}`;
}
import { Injectable } from '@angular/core';
import { BDiploma, BDiplomas } from '../../modules/back-modules/b-diplomas.interface';
import { IDiploma } from '../../modules/diplomas/diplomas.interface';

@Injectable({
  providedIn: 'root',
})
export class DiplomasAdapt {
  getAllDiplomasAdaptor(data: BDiplomas): IDiploma[] {
    return data.payload.data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        immutable: item.immutable,
      }
    })
  }
  getDiplomaByIdAdaptor(data: BDiploma): IDiploma {
    return {
      id: data.payload.diploma.id,
      title: data.payload.diploma.title,
      description: data.payload.diploma.description,
      image: data.payload.diploma.image,
      immutable: data.payload.diploma.immutable,
    }
  }
}

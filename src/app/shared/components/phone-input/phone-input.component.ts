import { Component, input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';

export interface ICountry {
  name: string;
  shortName: string;
  code: string;
  flag: string;
  placeHolder: string
}

@Component({
  selector: 'app-phone-input',
  imports: [ReactiveFormsModule],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.css',
})
export class PhoneInputComponent {
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  isListOpen: boolean = false;
  toggleList(): void {
    this.isListOpen = !this.isListOpen;
  }

  selectedCountry: ICountry = { name: 'Egypt', shortName: 'EG', code: '+20', flag: 'Images/Flags/flag-egypt.png', placeHolder: '1012345678' }
  countries: ICountry[] = [
    { name: 'Palestine', shortName: 'PS', code: '+970', flag: 'Images/Flags/flag-palestine.png', placeHolder: '59 900 0000' },
    { name: 'Syria', shortName: 'SY', code: '+963', flag: 'Images/Flags/flag-Syria.png', placeHolder: '094 095 096' },
    { name: 'Egypt', shortName: 'EG', code: '+20', flag: 'Images/Flags/flag-egypt.png', placeHolder: '1012345678' },
    { name: 'Saudi', shortName: 'SA', code: '+20', flag: 'Images/Flags/flag-Saudi.png', placeHolder: '11 400 0000' }
  ]

  searchCountry(countryName: string): ICountry | undefined {
    return this.countries.find(c => c.name == countryName)
  }
  selectCountry(countryName: string) {
    const country: ICountry|undefined = this.searchCountry(countryName)
    if(country) {
      this.selectedCountry = country
    }
    // this.isListOpen = false
  }


  inputId = input.required<string>();
  control = input<AbstractControl>();

  get formControl(): FormControl {
    return this.control() as FormControl;
  }

  get isInValid(): boolean {
    const ctrl = this.control();
    return (ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty))!
  }
}

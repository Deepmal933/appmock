import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  selectedIndex:number;
  selectedType:string;
  noOfScreens:number;
  myFiles:File[] = [];


}

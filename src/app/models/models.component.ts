import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface ICar{
  "id": number,
  "year": number,
  "make": string
  "model": string
}


@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  years: number[] = [];
  makes: string[] = [];
  models: ICar[] = [];
  displayedCars: ICar[] = [];
  selectedYear = 1958;
  selectedMake = "Tesla";
  curPage = 1;
  isNextDisabled = false;
   lastPage: boolean =true;

  displayedColumns: string[] = ["make", "model", "year"];
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    //Comboboxen
    this.getYears();
    this.getMakes();
    this.getModels();


  }

  async getYears(){
    this.years=await this.http.get<number[]>("https://vehicle-data.azurewebsites.net/api/years").toPromise();
  }

  async getMakes(){
    this.makes=await this.http.get<string[]>("https://vehicle-data.azurewebsites.net/api/makes").toPromise();
  }

  async getModels(){
    this.models=await this.http.get<ICar[]>("https://vehicle-data.azurewebsites.net/api/models").toPromise();
  }

  pPage() {
    if (this.curPage > 0) {
      this.curPage--;
      this.ngOnInit();
    }
  }

  nPage() {
    this.curPage++;
    this.ngOnInit();
  }
}

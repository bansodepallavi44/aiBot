import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators/map';


@Injectable({
  providedIn: 'root'
})
export class BotTrainingService {

  constructor(private http: HttpClient) {

  }

  getAllTrainData(apiAuth: any,botName:any,end:any=100,start:any=0) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.get(
      `${environment.API_BASE_URL}/train/show_all_training_data?start=${start}&end=${end}&bot=${botName}`,
      httpOptions
    );
  }

  // 

  addNewTrainData(apiAuth: any, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.post(`${environment.API_BASE_URL}/train/training_data_view`, data, httpOptions);
  }

  deleteTrainData(apiAuth: any, id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.delete(`${environment.API_BASE_URL}/train/training_data_view?id=${id}`, httpOptions);
  }
  editTrainData(apiAuth: any, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.put(`${environment.API_BASE_URL}/train/training_data_view`, data, httpOptions);
  }
  getSingleTrainData(apiAuth: any, id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.get(`${environment.API_BASE_URL}/train/training_data_view?id=${id}`, httpOptions);
  }


  getSimilarQuestions(apiAuth:any,query:any,similar_question:any=true){

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      })
    };
    let data = {
      "similar_question": similar_question,
      "query": query
    }
    return this.http.post(`${environment.API_BASE_URL}/train/get_category`,data ,httpOptions);
  }

  ///Store current bot id
  private intentList: any = [];
  public intentListSubject = new BehaviorSubject<[]>([]);
  
  assignIntentList(intentList: any) {
    this.intentList=intentList;
    this.intentListSubject.next(this.intentList);
    console.log("in assign ",this.intentListSubject);
  }


  public responseSubject = new BehaviorSubject<any>('');
  changeResponse(html: any) {
    this.responseSubject.next(html);
  }

  addIntent(intent: any,doEmpty=false) {
    if(doEmpty){
      this.intentList = [];
      this.intentListSubject.next(this.intentList);
    }else{
    this.intentList.push(intent);
    this.intentListSubject.next(this.intentList);
    //console.log("in push ",intent);
    }
  }

  removeIntent(index: any) {
    this.intentList.splice(index,1);
    this.intentListSubject.next(this.intentList);
    console.log("in remove ",this.intentListSubject);
  }
  ////////////////////////
}

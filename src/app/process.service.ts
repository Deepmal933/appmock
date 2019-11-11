import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {


  constructor( private http: HttpClient,private auth:AuthService) { }

  getImage(){
  		return this.http.get(`/img`);
  }

  sendImage(myFiles:File[],no:number){

    console.log("fggf"+myFiles);

      const frmData = new FormData();
  
      for (var i = 0; i < myFiles.length; i++) { 
        frmData.append("fileUpload[]", myFiles[i]);
      }
      frmData.append("no",String(no));
  

    return this.http.post(`/convert`,frmData);
  }

  publishShot(shotfile:File,title:string,des:string,tags:string[]){
    const frmdata = new FormData();
    console.log(shotfile);
    frmdata.append('jwt',this.auth.getToken());
    frmdata.append('image',shotfile);
    frmdata.append('title',title);
    frmdata.append('des',des);
    frmdata.append('tags',JSON.stringify(tags));
    return this.http.post(`/publish`,frmdata);

  }

  
}

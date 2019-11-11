import { Component, OnInit } from '@angular/core';
import { ProcessService } from './process.service'
import { DomImageService } from './dom-image.service'
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { from } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';


@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  title = 'appmock';
  imgsrc:string;
  selectedFile: File;
  filestring: string;
  color:string;
  back:boolean = false;
   

  object: Object = {foo: 'bar', baz: 'qux', nested: {xyz: 3, numbers: [1, 2, 3, 4, 5]}};

  step1:boolean ;
  step2:boolean;
  step3:boolean=true;
  loading:boolean;
  mockup:string;
  selected:number = 1;

  colors:string[]=[];
  selectedColor:string;




  constructor(private image : ProcessService,private domimage : DomImageService,){

  }
  ngOnInit(){
      this.image.getImage().subscribe(result => {
        console.log(result)
      },
      error => {
        console.log(error);
      }
      );



  }

  onKey(event: any) {
    this.color = event.target.value;
  }

  selectMock(no:number){
    this.back = true;
    this.step1 = false;
    this.step2 = true;
    this.selected = no;

  }

  backk(){
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.loading = false;
    this.back = false;
  }

  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0]

   

  // }



  // onUpload(){
  //   this.image.sendImage(this.selectedFile).subscribe(result=>{
  //       this.imgsrc = result.data;
  //       console.log(result);
  //   },error=>{

  //   });
  // }






 public files: UploadFile[] = [];
 public myFiles:File[] = [];

 
  public dropped(event: UploadEvent) {
    this.step2 = false;
    this.loading = true;
    this.myFiles = [];
    this.files = event.files;
    

    let count =0;

    console.log("files"+this.files);
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 this.myFiles.push(file);
 console.log("push"+this.myFiles.length);
 count= count+1;
 console.log(count);
 console.log(event.files.length+" "+count);
 if(event.files.length == count){
        this.sendingImage(this.selected);
 }


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        count= count+1;
        console.log(count);
        console.log(event.files.length+" "+count);
        if(event.files.length == count){
               this.sendingImage(this.selected);
        }


      }
     
    }

   

  }

  public sendingImage(no:number){
    console.log("erre"+this.myFiles.length);
    this.image.sendImage(this.myFiles,no).subscribe(result=>{

      this.loading = false;
      this.step3 = true;
      this.mockup = result['data'];
      console.log(result['data']);
  },error=>{
    console.log(error)

  });
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  downloadImage(){
// this.domimage.compress(this.mockup);
  }

  selectColor(i:number){
    this.selectedColor = this.colors[i];
  }

}


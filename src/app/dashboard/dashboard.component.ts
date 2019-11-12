import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../data.service'
import { Router, NavigationEnd } from '@angular/router'
import { ProcessService } from '../process.service'
import { ColorPickerModule } from 'ngx-color-picker';
import { DomImageService} from "../dom-image.service";
import { NgxfUploaderModule } from 'ngxf-uploader';
import { FileError, NgxfUploaderService, UploadEvent, UploadStatus } from 'ngxf-uploader';

import { AuthService } from '../auth.service'
import { first } from 'rxjs/operators';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
 

  mockimg:string;
  color:string="#dee3f1";
  backcolor:any;
  backborder:string;
  printcolor:any;
  selected:number;
  gradpanel:boolean;
  openupload:boolean=true;
  nofile:number;
  files:File[];
  uploadagain:boolean;
  disabled:boolean=true;
  radius:string[]=["0px","20px","40px","60px","80px"];
  selectedRadius:string="0px";
  label:string = "Radius"
  radiusselect:boolean;
  downloadsize:string[] = ["1x","2x","3x","4x"]
  selectedSize:string;
  devicetype:string[]=["All","Clean","Iphone","Android","Web"]
  selectedDevice:string;
  avatar:string;
  shottags:any[];
  tags:string[]=[];
  shottitle:string;
  shotdes:string;
  publishpopup:boolean = false;
  shotimg:string;
  downloadpop:boolean = false;

  gradients = [
    {color1:"#7BB2FF",color2:"#8897FF",degree:"45"},
    {color1:"#FFB0A0",color2:"#FFA1A1",degree:"45"},
    {color1:"#AFACFF",color2:"#8897FF",degree:"45"},
    {color1:"#FCB1FF",color2:"#AF99FF",degree:"45"}

  ]



  iphonemock=[
    {id:1,src:"../assets/iphone/mock1.png",screens:2,tag:"IphoneX",assets:['../assets/top.png'],cat:"Clean"},
    {id:2,src:"../assets/iphone/mock2.png",screens:1,tag:"IphoneX",assets:['../assets/top.png','../assets/iphonexassets/back.png','../assets/iphonexassets/mask.png','../assets/iphonexassets/top.png'],cat:"Iphone"},
    {id:3,src:"../assets/iphone/mock3.png",screens:1,tag:"IphoneX",assets:['../assets/top.png','../assets/wiphonex/back.png','../assets/wiphonex/mask.png','../assets/wiphonex/top.png'],cat:"Iphone"},
    {id:4,src:"../assets/iphone/mock5.png",screens:1,tag:"IphoneX",assets:['../assets/top.png','../assets/mock5/back.png','../assets/mock5/mask.png','../assets/mock5/top.png'],cat:"Iphone"},
    {id:5,src:"../assets/iphone/mock4.png",screens:1,tag:"IphoneX",assets:['../assets/top.png','../assets/iphonex2/back.png','../assets/iphonex2/mask.png','../assets/iphonex2/top.png'],cat:"Iphone"},
    {id:6,src:"../assets/iphone/mock6.png",screens:1,tag:"IphoneX",assets:['../assets/top.png'],cat:"Clean"},
    {id:7,src:"../assets/iphone/mock7.png",screens:2,tag:"IphoneX",assets:['../assets/top.png'],cat:"Clean"},
    {id:8,src:"../assets/iphone/mock8.png",screens:2,tag:"IphoneX",assets:['../assets/top.png'],cat:"Clean"},
    {id:9,src:"../assets/iphone/mock9.png",screens:2,tag:"IphoneX",assets:['../assets/top.png','../assets/iphonex2/back.png','../assets/iphonex2/mask.png','../assets/iphonex2/top.png'],cat:"Iphone"},
    {id:10,src:"../assets/iphone/mock10.png",screens:2,tag:"IphoneX",assets:['../assets/top.png'],cat:"Clean"},
    {id:11,src:"../assets/iphone/mock11.png",screens:1,tag:"IphoneX",assets:['../assets/top.png'],cat:"Clean"}

  ];

  constructor(private auth:AuthService,private Upload: NgxfUploaderService,private process:ProcessService,private route:Router,private domimage : DomImageService) {
  
//     if(!this.auth.loggedIn)
//     {
// this.route.navigate(['/login']);
//     }

//     this.auth.checkToken().pipe(first()).subscribe(
//       result=>{
//         this.avatar = result.avatar;
//       },
//       err=> this.route.navigate(['/login']) 
//       )
  }

  ngOnInit() {

    console.log(this.iphonemock[0].assets);
    this.getData(2);
    this.printcolor = this.color;
    this.selectedSize = this.downloadsize[0];
    this.selectedDevice = this.devicetype[0];
    //   this.process.sendImage(this.myFiles,this.data.selectedIndex).subscribe(result=>{
    //         this.mockimg = result['data'];
    //         console.log(this.mockimg);
    //         this.change.detectChanges();
            
    // },error=>{
    //   console.log(error)
  
    // });;
    
  }

  getData(id:number){
    var selected = this.iphonemock.find(x=>x.id == id);
    return selected;
  }


  downloadImage(){

    if(this.domimage.finalImage != null){
    this.domimage.download(this.domimage.finalImage,this.printcolor,this.selectedSize);
    }
      
  }

  changeMock(id:number){

    this.selected=id;
    if(this.getData(id).cat === 'Clean'){
      this.radiusselect = true;
    }
    else{
      this.radiusselect = false;
    }
    var radius:number = +this.selectedRadius.substring(0, this.selectedRadius.length - 2);

    if(this.files.length > 0 && this.files.length <= 2){
    this.domimage.convertToURL(this.getData(id).assets,this.files,id,radius);
    }
    else{
      this.openupload=true;
    }

  }

  usedemo(){
  fetch('https://i.ibb.co/yh7dQsQ/screenshot.png').then(data=>{
    data.blob().then(blob=>{
      let metadata = {
        type: 'image/jpeg'
      };
      let file = new File([blob], "test.jpg", metadata);
      this.uploadFiles([file])
    }

    )
  });
  

  }

  uploadFiles(files: File[] | FileError): void {

    console.log(files);
    if(files instanceof Array){
   
    if(files.length > 0 && files.length <= 2){
      this.files = files;
      this.openupload = false;
      this.nofile = files.length;
      this.disabled = false;
      this.backcolor = this.color;
      var radius:number = +this.selectedRadius.substring(0, this.selectedRadius.length - 2);


      if(this.nofile == 2){
        this.selected = 1;
        this.changeMock(1);
      }
      else if(this.nofile == 1){
        this.selected = 2;
        this.changeMock(2);
      }
    }

    }

  }

  colorChange(col:string){
    this.backcolor = col;
    this.printcolor = col;
    this.backborder = '1px solid rgba(0,0,0,0.01)'
  }

  applygrad(id:number){

      var col = 'linear-gradient('+this.gradients[id].degree+'deg,'+this.gradients[id].color1+','+this.gradients[id].color2+')';
      this.backborder = 'none'
      this.backcolor = col;
      this.printcolor = this.gradients[id];
      console.log(typeof this.printcolor);

  }
  
closeupload(){
  if(this.uploadagain){
this.openupload=false;
  }
  else{
    this.openupload=true;

  }

}

changeRadius(){
this.changeMock(this.selected);
}

checkCat(cat:string){

  if(this.selectedDevice === "All"){
    return "all"
  }else{
  if(cat === this.selectedDevice){
    return this.selectedDevice;
  }
  else{
    return this.selectedDevice;
  }
}
}

logout(){
  this.auth.logout();
  this.route.navigate(['/login']);
}

publishdialog(){
this.downloadpop = false;
  this.publishpopup = !this.publishpopup;
  if(this.publishpopup){
  if(this.domimage.finalImage != null){
    var url = this.domimage.publish(this.domimage.finalImage,this.printcolor,"4x");
    this.shotimg = url;
  }
}
}

downloaddialog(){
this.publishpopup = false;
this.downloadpop = !this.downloadpop;
}

publishshot(){

 
  if(this.domimage.finalImage != null){
    this.domimage.send(this.domimage.finalImage,this.printcolor,this.selectedSize).toBlob((blob) => {
      const file = new File([blob], "shot", {
          type: 'image/png',
          lastModified: Date.now()
      });
      this.process.publishShot(file,this.shottitle,this.shotdes,this.tags).subscribe((result)=>{
        this.publishpopup = false;  
        console.log("submittes")

      },
        (error)=>{
          console.log(error);
        })
  }, 'image/png', 1);;
    }
  

  
}

dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], {type: mimeString});

}

convertToFile(blob):File{
  return new File([blob], "shots", {
    type: 'image/png',
    lastModified: Date.now()
});
}

onAdd(e: any){
  this.tags.push(e.value);
console.log(e.value);
}

}

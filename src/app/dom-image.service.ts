import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { reject } from 'q';
import { ProcessService } from './process.service';



@Injectable({
  providedIn: 'root'
})
export class DomImageService {

  constructor(private process:ProcessService) { }

  finalImage:any;






  send(finalimg:any,color:any,size:string):HTMLCanvasElement{
    var width,height;
    if(size === "1x"){
       width = 800;
       height = 600;
    }
    else if(size === "2x"){
        width = 1600;
        height = 1200; 
    }
    else if(size == "3x"){
        width = 2400;
        height = 1800;
    }
    else if(size == "4x"){
        width = 3200;
        height = 2400;
    }
   
    console.log("save file:");

    const fileName = "mock@"+size;
    console.log(finalimg);

    var img = new Image();

        img.src = this.finalImage;
                const elem = document.createElement('canvas');
                elem.width = width;
                elem.height = height;
                var ctx = elem.getContext('2d');
                ctx.beginPath();
                if(color instanceof Object){
                    var angle = color.degree * Math.PI / 180,
                    x2 = width* Math.cos(angle),
                    y2 = height* Math.sin(angle);
                    var grd = ctx.createLinearGradient(0, 0, x2, y2);
                    grd.addColorStop(0, color.color1);
                    grd.addColorStop(1, color.color2);
                    ctx.fillStyle = grd;
                }
                else{
                    ctx.fillStyle = color;                   
                }
               
                
ctx.rect(0, 0, width, height);

ctx.fill();
                
                // img.width and img.height will give the original dimensions
                ctx.drawImage(img, 0, 0, width, height);
                ctx.save();
 
// hold top-right hand corner when rotating
// ctx.translate( ctx.canvas.width - 30, ctx.canvas.height - 30);
 
// // rotate 270 degrees
// ctx.rotate( 3 * Math.PI / 2 );
 
// ctx.font = "22px CircularStd";
// ctx.fillStyle = "rgba(0,0,0,0.3)"; // blue
// ctx.textAlign = "left";
// ctx.fillText( "created using mock.design", 0, 0 );
 
// ctx.restore();
                return ctx.canvas;
                                        
            }

download(finalimg:any,color:any,size:string){
                var width,height;
                if(size === "1x"){
                   width = 800;
                   height = 600;
                }
                else if(size === "2x"){
                    width = 1600;
                    height = 1200; 
                }
                else if(size == "3x"){
                    width = 2400;
                    height = 1800;
                }
                else if(size == "4x"){
                    width = 3200;
                    height = 2400;
                }
               
                console.log("save file:");
            
                const fileName = "mock@"+size;
                console.log(finalimg);
            
                var img = new Image();
            
                    img.src = this.finalImage;
                            const elem = document.createElement('canvas');
                            elem.width = width;
                            elem.height = height;
                            var ctx = elem.getContext('2d');
                            ctx.beginPath();
                            if(color instanceof Object){
                                var angle = color.degree * Math.PI / 180,
                                x2 = width* Math.cos(angle),
                                y2 = height* Math.sin(angle);
                                var grd = ctx.createLinearGradient(0, 0, x2, y2);
                                grd.addColorStop(0, color.color1);
                                grd.addColorStop(1, color.color2);
                                ctx.fillStyle = grd;
                            }
                            else{
                                ctx.fillStyle = color;                   
                            }
                           
                            
            ctx.rect(0, 0, width, height);
            
            ctx.fill();
                            
                            // img.width and img.height will give the original dimensions
                            ctx.drawImage(img, 0, 0, width, height);
                            ctx.save();
             
            // hold top-right hand corner when rotating
            // ctx.translate( ctx.canvas.width - 30, ctx.canvas.height - 30);
             
            // // rotate 270 degrees
            // ctx.rotate( 3 * Math.PI / 2 );
             
            // ctx.font = "22px CircularStd";
            // ctx.fillStyle = "rgba(0,0,0,0.3)"; // blue
            // ctx.textAlign = "left";
            // ctx.fillText( "created using mock.design", 0, 0 );
             
            // ctx.restore();
                             ctx.canvas.toBlob((blob) => {
                                const file = new File([blob], fileName, {
                                    type: 'image/png',
                                    lastModified: Date.now()
                                });
                                                    console.log("save file");
            
            
                                FileSaver.saveAs(file);
                            }, 'image/png', 1);
                                                    
                        }
publish(finalimg:any,color:any,size:string):any{
                            var width,height;
                            if(size === "1x"){
                               width = 800;
                               height = 600;
                            }
                            else if(size === "2x"){
                                width = 1600;
                                height = 1200; 
                            }
                            else if(size == "3x"){
                                width = 2400;
                                height = 1800;
                            }
                            else if(size == "4x"){
                                width = 3200;
                                height = 2400;
                            }
                           
                            console.log("save file:");
                        
                            const fileName = "mock@"+size;
                            console.log(finalimg);
                        
                            var img = new Image();
                        
                                img.src = this.finalImage;
                                        const elem = document.createElement('canvas');
                                        elem.width = width;
                                        elem.height = height;
                                        var ctx = elem.getContext('2d');
                                        ctx.beginPath();
                                        if(color instanceof Object){
                                            var angle = color.degree * Math.PI / 180,
                                            x2 = width* Math.cos(angle),
                                            y2 = height* Math.sin(angle);
                                            var grd = ctx.createLinearGradient(0, 0, x2, y2);
                                            grd.addColorStop(0, color.color1);
                                            grd.addColorStop(1, color.color2);
                                            ctx.fillStyle = grd;
                                        }
                                        else{
                                            ctx.fillStyle = color;                   
                                        }
                                       
                                        
                        ctx.rect(0, 0, width, height);
                        
                        ctx.fill();
                                        
                                        // img.width and img.height will give the original dimensions
                                        ctx.drawImage(img, 0, 0, width, height);
                                        ctx.save();
                         
                        // hold top-right hand corner when rotating
                        // ctx.translate( ctx.canvas.width - 30, ctx.canvas.height - 30);
                         
                        // // rotate 270 degrees
                        // ctx.rotate( 3 * Math.PI / 2 );
                         
                        // ctx.font = "22px CircularStd";
                        // ctx.fillStyle = "rgba(0,0,0,0.3)"; // blue
                        // ctx.textAlign = "left";
                        // ctx.fillText( "created using mock.design", 0, 0 );
                         
                        // ctx.restore();
                                       

                                        return ctx.canvas.toDataURL();
                                                                
                                    }

convertToURL(urls:string[],file:File[],mockno:number,radius:number){
    var image:string[] = [];

    for(let i =0;i<file.length;i++){
image.push(URL.createObjectURL(file[i]));
    }

    this.addIamges(image,urls,mockno,radius)
}


    async addIamges(image: string[], urls: string[],mockno:number,radius:number) {
        image = image.concat(urls);
        await this.loadImages(image,mockno,radius);

    }

async loadImages(images:string[],mockno:number,radius:number){

  


    Promise.all(images.map(image=>{
        return new Promise((fulfill, reject) => {
            let img = new Image();
            img.onload = () => fulfill(img);
            img.src = image;
          });
    })).then(results=>{

        switch(mockno){
            case 1:
            this.mock1(results,radius);
            break;

            case 2: 
            case 3:
            this.mock2(results);
            break;

            case 4:
            case 5:
            this.mock3(results);
            break;

            case 6:
            this.mock6(results,radius);
            break;

            case 7:
            this.mock7(results,radius);
            break;

            case 8:
            this.mock8(results,radius);
            break;

            case 9:
            this.mock9(results);
            break;

            case 10:
            this.mock10(results,radius);
            break;

            case 11:
            this.mock11(results,radius);
            break;
        }
        
       
    })

}
    


mock6(img:any[],radius){
    const elem = document.createElement('canvas');
    elem.width = 3200;
    elem.height = 2400;
    var ctx = elem.getContext('2d');  
    ctx.beginPath();    
    ctx.fillStyle ="rgba(0,0,0,0)";
    ctx.rect(0, 0, elem.width, elem.height);
    ctx.fill();
    console.log(img);

        var width = (2000*img[0].width)/img[0].height;
        var x1 = (3200 - width)/2;
        var height = 2000;

        var y1 = (2400 - height)/2;
        console.log(y1);

        ctx.drawImage(img[1],x1,y1,width,height+200);
        this.roundedImage(ctx,x1,y1,width,height,radius);
        ctx.drawImage(img[0],x1,y1,width,height);
        ctx.restore();
ctx.save();

console.log(ctx.canvas.toDataURL());
        this.save(ctx,elem);
}

mock11(img:any[],radius){
    const elem = document.createElement('canvas');
    elem.width = 3200;
    elem.height = 2400;
    var ctx = elem.getContext('2d');  
    ctx.beginPath();    
    ctx.fillStyle ="rgba(0,0,0,0)";
    ctx.rect(0, 0, elem.width, elem.height);
    ctx.fill();
    console.log(img);

        var width = (2400*img[0].width)/img[0].height;
        var x1 = (3200 - width)/2;
        var height = 2400;

        var y1 = (2400 - height)/2;
        console.log(y1);

        ctx.drawImage(img[1],x1,y1+100,width,height+200);
        this.roundedImage(ctx,x1,y1+300,width,height,radius);
        ctx.drawImage(img[0],x1,y1+300,width,height);
        ctx.restore();
ctx.save();

console.log(ctx.canvas.toDataURL());
        this.save(ctx,elem);
}




mock1(img:any[],radius:number){
    console.log(radius);
    const elem = document.createElement('canvas');
    elem.width = 3200;
    elem.height = 2400;
    var ctx = elem.getContext('2d');  
    ctx.beginPath();    
    ctx.fillStyle ="rgba(0,0,0,0)";
    ctx.rect(0, 0, elem.width, elem.height);
    ctx.fill();
    console.log(img);
    var width = (2000*img[0].width/img[0].height)
    var x1 = (3200 - ((width*2)+200))/2;
    var x2 = x1+200+width;


        var height = 2000;
        
        var y1 = (2400 - height)/2;

        console.log(y1);

        ctx.drawImage(img[2],x2,y1,width,height+200);

        ctx.drawImage(img[2],x1,y1,width,height+200);
        this.roundedImage(ctx,x2,y1,width,height,radius);
        ctx.drawImage(img[1],x2,y1,width,height);
        ctx.restore();
        this.roundedImage(ctx,x1,y1,width,height,radius);
        ctx.drawImage(img[0],x1,y1,width,height);
        ctx.restore();

ctx.save();

console.log(ctx.canvas.toDataURL());
        this.save(ctx,elem);
}

mock10(img:any[],radius:number){
    console.log(radius);
    const elem = document.createElement('canvas');
    elem.width = 3200;
    elem.height = 2400;
    var ctx = elem.getContext('2d');  
    ctx.beginPath();    
    ctx.fillStyle ="rgba(0,0,0,0)";
    ctx.rect(0, 0, elem.width, elem.height);
    ctx.fill();
    console.log(img);
    var width = (2000*img[0].width/img[0].height)
    var x1 = (3200 - ((width*2)+200))/2;
    var x2 = x1+200+width;


        var height = 2000;
        
        var y1 = (2400 - height)/2;

        console.log(y1);

        ctx.drawImage(img[2],x2,y1+80,width,height+200);

        ctx.drawImage(img[2],x1,y1-80,width,height+200);
        this.roundedImage(ctx,x2,y1+80,width,height,radius);
        ctx.drawImage(img[1],x2,y1+80,width,height);
        ctx.restore();
        this.roundedImage(ctx,x1,y1-80,width,height,radius);
        ctx.drawImage(img[0],x1,y1-80,width,height);
        ctx.restore();

ctx.save();

console.log(ctx.canvas.toDataURL());
        this.save(ctx,elem);
}


mock7(img:any[],radius:number){
    const elem = document.createElement('canvas');
    elem.width = 3200;
    elem.height = 2400;
    var ctx = elem.getContext('2d');  
    ctx.beginPath();    
    ctx.fillStyle ="rgba(0,0,0,0)";
    ctx.rect(0, 0, elem.width, elem.height);
    ctx.fill();
    console.log(img);
    var width = (2000*img[0].width/img[0].height)
    var x1 = (3200 - ((width*2)+200))/2;
    var x2 = x1+200+width;


        var height = 2000;
        
        var y1 = (2400 - height)/2;

        console.log(y1);

        ctx.drawImage(img[2],x2,y1-400,width,height+200);

        ctx.drawImage(img[2],x1,y1+200,width,height+200);

        this.roundedImage(ctx,x2,y1-400,width,height,radius);
        ctx.drawImage(img[1],x2,y1-400,width,height);
        ctx.restore();

        this.roundedImage(ctx,x1,y1+400,width,height,radius);
        ctx.drawImage(img[0],x1,y1+400,width,height);
        ctx.restore();

        ctx.save();

        console.log(ctx.canvas.toDataURL());
                this.save(ctx,elem);
}

mock8(img:any[],radius:number){
    const elem = document.createElement('canvas');
    elem.width = 3200;
    elem.height = 2400;
    var ctx = elem.getContext('2d');  
    ctx.beginPath();    
    ctx.fillStyle ="rgba(0,0,0,0)";
    ctx.rect(0, 0, elem.width, elem.height);
    ctx.fill();
    console.log(img);
    var width = (2500*img[0].width/img[0].height)
    var x1 = (3200 - ((width*2)-200))/2;
    var x2 = x1+width-200;


        var height = 2500;
        
        var y1 = (2400 - height)/2;

        console.log(y1);

        ctx.drawImage(img[2],x2,y1+300,width,height+200);

        this.roundedImage(ctx,x2,y1+600,width,height,radius);
        ctx.drawImage(img[1],x2,y1+600,width,height);
        ctx.restore();

        ctx.drawImage(img[2],x1+100,y1+200,width+200,height+200);

        this.roundedImage(ctx,x1,y1+400,width,height,radius);
        ctx.drawImage(img[0],x1,y1+400,width,height);
        ctx.restore();

ctx.save();

console.log(ctx.canvas.toDataURL());
        this.save(ctx,elem);
}

mock2(img:any[]){

        var screen = img[0];
        var shadow = img[1];
        var back = img[2];
        var mask = img[3];
        var top = img[4];

        const elem = document.createElement('canvas');
        elem.width = 3200;
        elem.height = 2400;
        var ctx = elem.getContext('2d');  
        ctx.beginPath();    
        ctx.fillStyle ="rgba(0,0,0,0)";
        ctx.rect(0, 0, elem.width, elem.height);
        ctx.fill();
        console.log(img);
        var x1 = (3200 - ((850*2)+200))/2;
        var x2 =  x1+850+200;
        var height = (850*img[0].height)/img[0].width;
        console.log(height);
        var y1 = (2400 - height)/2;
        console.log(y1);
        var IX1 = (3200 - back.width)/2;
        var IY1 = (2400 - back.height)/2;
        var SX1 = IX1-50;
        var SY1 = IY1;
        ctx.drawImage(mask,IX1+52.04,IY1+42.47,mask.width,mask.height);
        ctx.globalCompositeOperation = 'source-atop';
        ctx.drawImage(screen,IX1+53.04,IY1+43.47,mask.width-2,height-3);
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(top,IX1+18.32,IY1+8.37,top.width,top.height);
        ctx.globalCompositeOperation = 'destination-over';

        ctx.drawImage(back,IX1,IY1,back.width,back.height);

        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(shadow,SX1,SY1,back.width+100,back.height+300);

        ctx.save()
        this.save(ctx,elem);
         
        

}

mock3(img:any[]){

    var screen = img[0];
    var shadow = img[1];
    var back = img[2];
    var mask = img[3];
    var top = img[4];

    const elem = document.createElement('canvas');
    elem.width = 3200;
    elem.height = 2400;
    var ctx = elem.getContext('2d');  
    ctx.beginPath();    
    ctx.fillStyle ="rgba(0,0,0,0)";
    ctx.rect(0, 0, elem.width, elem.height);
    ctx.fill();
    console.log(img);
    var backwidth = (2000*back.width)/back.height;
    var backheight = 2000;

    var screen1h = ((backwidth-62)*screen.height)/screen.width;

    var maskw = (backwidth - 62)
    var maskh = (backheight - 56)


    var IX1 = (3200 - backwidth)/2;
    var IY1 = (2400 - backheight)/2;

    var SX1 = IX1;
    var SY1 = IY1;


    ctx.drawImage(mask,IX1+31,IY1+28,maskw,maskh);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(screen,IX1+31,IY1+28,backwidth-62,screen1h);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(top,IX1,IY1,backwidth,backheight);
    ctx.globalCompositeOperation = 'destination-over';

    ctx.drawImage(back,IX1,IY1,back.width,back.height);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(shadow,SX1,SY1,back.width,back.height+150);

    ctx.save()
   

    ctx.save()
    this.save(ctx,elem);
     
    

}

mock9(img:any[]){

    var screen1 = img[0];
    var screen2 = img[1];
    var shadow = img[2];
    var back = img[3];
    var mask = img[4];
    var top = img[5];

    const elem = document.createElement('canvas');
    elem.width = 3200;
    elem.height = 2400;
    var ctx = elem.getContext('2d');  
    ctx.beginPath();    
    ctx.fillStyle ="rgba(0,0,0,0)";
    ctx.rect(0, 0, elem.width, elem.height);
    ctx.fill();
    console.log(img);
    var backwidth = (2000*back.width)/back.height;
    var backheight = 2000;

    var screen1h = ((backwidth-62)*screen1.height)/screen1.width;
    var screen2h = ((backwidth-62)*screen2.height)/screen2.width;

    var maskw = (backwidth - 62)
    var maskh = (backheight - 56)


    var IX1 = (3200 - ((backwidth*2)+200))/2;
    var IX2 =  IX1+backwidth+200;
    var IY1 = (2400 - backheight)/2;

    var SX1 = IX1;
    var SY1 = IY1;

    var SX2 = IX1+backwidth+200;

    ctx.drawImage(mask,IX1+31,IY1+28,maskw,maskh);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(screen1,IX1+31,IY1+28,backwidth-62,screen1h);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(top,IX1,IY1,backwidth,backheight);
    ctx.globalCompositeOperation = 'destination-over';

    ctx.drawImage(back,IX1,IY1,back.width,back.height);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(shadow,SX1,SY1,back.width,back.height+300);

    ctx.save()
    ctx.restore()

    ctx.drawImage(mask,IX2+31,IY1+28,maskw,maskh);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(screen2,IX2+31,IY1+28,backwidth-62,screen2h);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(top,IX2,IY1,backwidth,backheight);
    ctx.globalCompositeOperation = 'destination-over';

    ctx.drawImage(back,IX2,IY1,back.width,back.height);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(shadow,SX2,SY1,back.width,back.height+300);

    this.save(ctx,elem);
     
    

}




save(ctx:CanvasRenderingContext2D,elem:any){

        console.log(ctx.canvas.toDataURL);
            ctx.canvas.toBlob((blob) => {
        console.log(blob);
        this.blobToDataURL(blob);
        const file = new File([blob], "jnj", {
            type: 'image/png',
            lastModified: Date.now()
        });
        console.log("save file");
        


    }, 'image/png', 1);
        console.log("save");

}

blobToDataURL(blob) {
    var a = new FileReader();
    a.onload = (e) => {this.datauri(a.result);}
    a.readAsDataURL(blob);
}

datauri(data:any){
    console.log("data:"+data);
    this.finalImage = data;
    document.getElementById("mockimg").setAttribute("src",data);

    
}

roundedImage(ctx,x,y,width,height,radius){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();
  }




    

}



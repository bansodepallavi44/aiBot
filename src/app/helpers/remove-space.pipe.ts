import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'removeSpace' })
export class RemoveSpacePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    
      if(value){
          value = value.replace(/\s\s/g,"-");
          value = value.replace(/ /g,"-");
          value = value.replace(/[#$@!'"–_%&*?()]/g,"-");
          value = value.replace('/', '-');
          value = value.replace('--', '-');
          value = value.replace('---', '-');
          value = value.replace('----', '-');
          return value.toLowerCase();
      }else{
        return value;
      }
  }
}

// @Pipe({ name: 'addSpace' })
// export class AddSpacePipe implements PipeTransform {
//   transform(value: any, args?: any): any {
//     if(value){
//       return value? value.replace(/_/g, " ") : value;
//     }
   
//   }
// }

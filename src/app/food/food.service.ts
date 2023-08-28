import { Observable, pipe, of, fromEvent, throwError} from 'rxjs'
import { retry, retryWhen, delay, scan, take } from 'rxjs/operators'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService{

  
    getFoods_r():Observable<string>{

        let foods = [
          "apple","cherry","shoe","eggs"
        ]
      
        return Observable.create( observer => {
          for (let f of foods){
              if(f == 'shoe'){
                observer.error('Thats not a valid food')
              }
              else{
                observer.next(f)
              }
              
          } 
          observer.complete();
        })
        .pipe(
          retry(3)
        )
        
    }



    getFoods_rw():Observable<any>{

      let foods = [
        "apple","cherry","shoe","eggs"
      ]       

      return Observable.create( observer => {
  
        for (let f of foods){
            if(f == 'shoe'){

              throw new Error("not a food error")
            }
            else{
              observer.next(f)
            }
            
        } 

      })
      .pipe(
        retryWhen( (errors:Observable<any>) => {

          console.log(`WRITE TO LOG SYSTEM: error detected. retrying in 3 seconds`)
          
          return errors.pipe(
            delay(3000),
            take(3)
          )
        
        })
      )

      
      

    }

}

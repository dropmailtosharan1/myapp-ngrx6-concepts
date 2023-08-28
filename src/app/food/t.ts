export const FOOD_LIST = [
  "apple","banana","cherry","eggs"
]

import { Injectable } from '@angular/core';

/****** demo 137318 start *******/

  /*
  //RxJS 5 (works with shim)
    //import { Observable } from 'rxjs/Observable';
    //import 'rxjs/add/observable/from';

  //RxJS 6
    import { Observable, from } from 'rxjs'

  @Injectable({
    providedIn: 'root'
  })
  export class FoodService {

    constructor() { }

    //RxJS 5: Emits each food and then completes
    
    //getFoods():Observable<string>{
    //  return Observable.from(FOOD_LIST)
    //}
    

    //RxJS 6: Emits each food and then completes
    getFoods():Observable<string>{
      return from(FOOD_LIST)
    } 
    
  }
  */

/****** demo 137318 end *******/


/****** demo 137319 start *******/

  /*
  //RxJS 5 
  ////import { Observable } from 'rxjs/Observable';
  ////import 'rxjs/add/observable/from';
  ////import 'rxjs/add/operator/map';

  //RxJS 6
  import { Observable, from, pipe } from 'rxjs'
  import { map } from 'rxjs/operators'

  @Injectable({
    providedIn: 'root'
  })
  export class FoodService {

    //RxJS 5: Maps each food to an uppercase string then emits 
    
  //getFoodsUppercase():Observable<string>{
  //  return Observable.from(FOOD_LIST)
  //      .map( food => food.toUpperCase() )
  //}
    
    //RxJS6: Maps each food to an uppercase string then emits
    getFoodsUppercase():Observable<string>{
      return from(FOOD_LIST)
        .pipe(
          map( food => food.toUpperCase() )
        )
    } 
    


  }
  */
/****** demo 137319 end *******/


/****** demo 137320 start *******/

  /*
  //RxJS 6
  import { Observable, from, pipe } from 'rxjs'
  import { passOnlyStartsWithVowel } from "../custom-operators/custom-operators"
  import { map } from 'rxjs/operators'

  @Injectable({
    providedIn: 'root'
  })
  export class FoodService {

    //RxJS6: Maps each food that starts with a vowel to an uppercase string then emits
    getVowelFoods():Observable<string>{
      return from(FOOD_LIST)
        .pipe(
          passOnlyStartsWithVowel(),
          map( food => food.toUpperCase() )
        )
    } 
  }
  */

/****** demo 137320 end *******/


/****** demo 137321 start *******/

  /*
  import { HttpClient } from "@angular/common/http"

  //RxJS 5 
  //import { Observable } from 'rxjs/Observable'
  //import 'rxjs/add/operator/toPromise'


  //RxJS 6
  import { Observable } from 'rxjs'


  @Injectable({
    providedIn: 'root'
  })
  export class FoodService{

    constructor(private http:HttpClient){

    }

    //RxJS convert observable to promise
    getFoods_p():Promise<any>{

      //let myObs:Observable<any> = this.http.get("http://localhost:2222/foods-list")
      //return myObs.toPromise()
      
      return this.http.get("http://localhost:2222/foods-list") //returns an Observable
      .toPromise()
    }


  }
  */

/****** demo 137321 end *******/


/****** demo 137322, 137323 start *******/

  /*
  //RxJS 5
  //import { Observable } from 'rxjs/Observable'
  //import 'rxjs/add/observable/of';
  //import 'rxjs/add/operator/catch';

  //RxJS6
  import { Observable, pipe, of} from 'rxjs'
  import { catchError } from 'rxjs/operators'

  @Injectable({
    providedIn: 'root'
  })
  export class FoodService{

      constructor(){}

      
      //getFoods_e():Observable<any>{
      //  
      //  return Observable.create( observer => {
  //
      //    let index = 0;
  //
      //    setInterval( ()=>{
  //
      //      let nextFood = FOOD_LIST[index]
  //
      //      if(nextFood){
      //        observer.next(nextFood)
      //        index++;
      //      }
      //      else{
      //        observer.error(new Error("Array access error"))
      //        //Observable.throw(new Error("Array access error"))
      //      }
  //
      //    },1000)
  //
      //  })
    //
      //  .catch( err=>{
      //  console.log(`There is some error with the observable`)
      //    console.log(`Dumping entire list`)
      //    return Observable.of(FOOD_LIST)
      //  })
      //  
      //}
      
      
      getFoods_e():Observable<any>{

        return Observable.create( observer => {

          let count = 0;

          setInterval( ()=>{

            let nextFood = FOOD_LIST[count]
            if(nextFood){
              observer.next(nextFood)
              count++;
            }
            else{
              observer.error(new Error("Array out of bounds error"))
            }

          },2000)

        })
        
        .pipe(
          catchError( err => {
            console.log(`There is some error with the observable`)
            console.log(`Dumping entire list`)  
            return of(FOOD_LIST)
          })
        )
        

      }
      
  }
  */

/****** demo 137322, 137323 end *******/



/****** demo 137324, 137325 start *******/

  
  import { Observable, pipe, of, fromEvent, throwError} from 'rxjs'
  import { retry, retryWhen, delay, scan, take } from 'rxjs/operators'

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
                  //throw new Error('Thats not a food')
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
  

/****** demo 137324, 137325 end *******/


/****** demo 137328 start *******/

  /*
  import { HttpClient } from "@angular/common/http"

  import { Observable, pipe, from} from 'rxjs'
  import { map, flatMap} from 'rxjs/operators'

  @Injectable({
    providedIn: 'root'
  })
  export class FoodService{

    constructor(private http:HttpClient){}

    getFoods_l():Observable<any>{

      let foodUrls = [
        'http://localhost:2222/food/3',
        'http://localhost:2222/food/4',
        'http://localhost:2222/food/5'
      ]

      
      //return Observable.create( observer => {
      //  foodUrls.forEach(url => {
      //    observer.next(url)
      //  });
      //})
      //.pipe(
      //  //map( (url:string) => this.http.get(url) )
      //  flatMap( (url:string) =>  this.http.get(url))
      //)
      
      

      
      return from(foodUrls)
        .pipe( 
          //map(url => this.http.get(url))
          flatMap(url => this.http.get(url))
        )

    }
  }
  */


/****** demo 137328 end *******/


/****** demo 137329 start *******/
  /*
    import * as _ from 'underscore'
    import { Observable, pipe, interval, merge} from 'rxjs'
    import { map, mergeAll } from 'rxjs/operators'
    import { mergeAnalyzedFiles } from '@angular/compiler';

    @Injectable({
      providedIn: 'root'
    })
    export class FoodService{


        getFruits():Observable<any>{

          let fruits = ['apple','banana','cherry']

          let fruit$ = interval(2000)
          .pipe(
            map( time => `Have a fruit: ${fruits[ _.random(0,(fruits.length-1))]}`) 
          )

          return fruit$

        }


        getVeggies():Observable<any>{
          
          let veggies = ['spinach','carrot','onion']

          let veggies$ = interval(2500)
          .pipe(
            map( time => `Have a vegetable: ${veggies[ _.random(0,(veggies.length-1))]}`) 
          )

          return veggies$

        }

        
        getMeats():Observable<any>{

          let meat = ['chicken','duck','beef']

          let meat$ = interval(1500)
          .pipe(
            map( time => `Have some meat: ${meat[ _.random(0,(meat.length-1))]}`) 
          )

          return meat$
        }


        getRandomFoods():Observable<any>{


            let random$ = merge(
              this.getFruits(),
              this.getVeggies(),
              this.getMeats()
            )

            return random$;

        }



    }
  */
/****** demo 137329 end *******/
import { Component, OnInit } from '@angular/core';
import { FoodService } from './food/food.service'
import { LottoService } from './lotto/lotto.service'

import { interval, of, from, pipe, fromEvent} from 'rxjs'
import { map, delay, scan, pluck, bufferCount } from 'rxjs/operators'
import { isNumber } from 'util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private foodService:FoodService, private lottoService: LottoService){}
  
  ngOnInit(){

      this.demo_evenQuadrupleNumbers()
      
      /*      
        //this.demo_evenQuadrupleNumbers()

        //this.demo_getRandomFoods();

        //this.demo_getFoods();
        
        //this.demo_getFoods_uppercase();

        //this.demo_getFoods_vowel();

        //this.demo_getFoods_promise();

        //this.demo_getFoods_e()

        //this.demo_getFoods_r()

        //this.demo_listenForWinningTicket(); 

        //this.demo_getFoods_links()

        //this.demo_scan()


      */
  }

  demo_evenQuadrupleNumbers(){

    let keypress$ = fromEvent(document,'keypress')

    let onlyNumbers$ = keypress$.pipe( 
      pluck('key'),
      map( (key:string) => {
        console.log(`key is: ${key}`)
        let num = parseInt(key)
        if(isNumber(num)){
          return num
        }
      })
      
    )

    let quadrupleSum$ = onlyNumbers$.pipe(
      bufferCount(4),
      map( (buffer:[number]) => {
        let sum = buffer[0] + buffer[1] + buffer[2] + buffer[3]
        console.log(`sum is: ${sum}`)
        return sum
      })
    )

    let evenOdd$ = quadrupleSum$.pipe(
      map( sum => {
        if (sum%2 == 0){
          return "even numbered quadruple detected"
        }
        else{
          throw new Error("odd numbered quaduple detected")
        }
      })
    )

    evenOdd$.subscribe(
      result => console.log(`${result}`),
      err => console.log(`${err}`),
      () => console.log(`stream complete`)
    )

  }

  

}












  /*

    demo_evenQuadrupleNumbers(){

      let keypress$ = fromEvent(document,'keypress')

      let onlyNumbers$ = keypress$.pipe( 
        pluck('key'),
        map( (key:string) => {
          console.log(`key is: ${key}`)
          let num = parseInt(key)
          if(isNumber(num)){
            return num
          }
        })
        
      )

      let quadrupleSum$ = onlyNumbers$.pipe(
        bufferCount(4),
        map( (buffer:[number]) => {
          let sum = buffer[0] + buffer[1] + buffer[2] + buffer[3]
          console.log(`sum is: ${sum}`)
          return sum
        })
      )

      let evenOdd$ = quadrupleSum$.pipe(
        map( sum => {
          if (sum%2 == 0){
            return "even numbered quadruple detected"
          }
          else{
            throw new Error("odd numbered quaduple detected")
          }
        })
      )

      evenOdd$.subscribe(
        result => console.log(`${result}`),
        err => console.log(`${err}`),
        () => console.log(`stream complete`)
      )

  }

  demo_getRandomFoods(){

    
    //this.foodService.getFruits()
    //.subscribe(
    //  fruit => console.log(`${fruit}`)
    //)
    

    
      this.foodService.getRandomFoods()
      .subscribe(
        food => console.log(`${food}`)
      )
    
  }
  */



  /*
  demo_getFoods_links(){
  
    this.foodService.getFoods_l().
    subscribe(
      next => console.log(next)
    )
  }
  */



/*
demo_getFoods(){
    
  this.foodService.getFoods()
  .subscribe( food => {
    console.log(`value received: ${food}`)
  })
  
}
*/

    /*
    demo_getFoods_uppercase(){
  
      this.foodService.getFoodsUppercase()
      .subscribe( food => {
        console.log(`value received: ${food}`)
      })
      
    }
    */

    /*
    demo_getFoods_vowel(){
  
      this.foodService.getVowelFoods()
      .subscribe( food => {
        console.log(`value received: ${food}`)
      })
      
    }
    */

  /*
  demo_getFoods_promise(){
    this.foodService.getFoods_p()
    .then( foods => console.log(foods))
    .catch( err => console.log(`error getting foods: ${err}`))
  }
  */

  /*
  demo_getFoods_e(){

      this.foodService.getFoods_e()
      .subscribe(
        next => { console.log(`received emitted value: ${next}`)},
        //error => { console.log(`received an error: ${error}`)},
        //() => { console.log(`received stream complete`)}
      ) 
  }
  */


  /*
  demo_getFoods_r(){

    
    this.foodService.getFoods_r()
    .subscribe(
      next => { console.log(`received emitted value: ${next}`)},
      error => { console.log(`got an error: ${error}`)},
      () => { console.log(`stream complete`)}

    )  
    

    
    this.foodService.getFoods_rw()
    .subscribe(
      next => { console.log(`received emitted value: ${next}`)},
      error => { console.log(`got an error: ${error}`)},
      () => { console.log(`stream complete`)}

    ) 
    
    
     
  }
  */

  /*
  demo_listenForWinningTicket(){

    this.lottoService.ticketCheckAgent()
    .subscribe(
      next => { console.log(`received emitted value:`); console.log(next) },
      error => { console.log(`received an error: ${error}`)},
      () => { console.log(`received stream complete`)}
    )
  }
  */

  /*
 demo_scan(){

  let interval$ = interval(1000)

  
  //interval$.subscribe(
  //  value => console.log(value)
  //)
  
 
  interval$.pipe(
    scan( (acc,current) => {
      console.log(`current interval: ${current} / accumulated value: ${acc}`)
      console.log(`Result = ${current} + ${acc}`)
      return  acc + current
    })
  )
  .subscribe(
    value => { console.log(`${value}`)}
  )
  

}
*/





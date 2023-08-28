import { Injectable } from '@angular/core';
import { Observable, pipe, of, fromEvent} from 'rxjs'
import { map, pluck, bufferCount, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class LottoService {
  
  ticketCheckAgent():Observable<any>{

    let winningTicket = "ALA"

    let keypress$ = fromEvent(document, 'keypress')

    return keypress$.pipe(
      pluck("key"),
      tap( key => console.log(`${key}`)),
      bufferCount(3),
      map( (ticketChars:string[]) => {
        var ticket = ticketChars.join("")
        console.log(`ticket: ${ticket}`)
        return ticket
      }),
      map((ticket:string) => {
        if(ticket.toUpperCase() == winningTicket){
          return {
            winner:true,
            ticket:ticket
          }
          
        }
        else{
          return {
            winner:false,
            ticket:ticket
          }

        }
      })
    )

  }

}

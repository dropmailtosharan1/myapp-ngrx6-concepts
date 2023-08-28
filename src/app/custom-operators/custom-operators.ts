import { Observable } from "rxjs";

export const passOnlyStartsWithVowel = () => <T>(source:Observable<T>) => 

    new Observable<T>( observer => {

        return source.subscribe({
            next(x){
                
                let char = x.toString().charAt(0).toLowerCase()
                if (char == "a" || 
                    char == "e" || 
                    char == "i" ||
                    char == "o" ||
                    char == "u" ){
                        
                    observer.next(x)
                }

            },
            error(err){
                observer.error(err)
            },
            complete(){
                observer.complete()
            }


        })
})




import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, retryWhen } from "rxjs/operators";

export function delayRetryPipe<T>(delayMs = 1000, maxRetry = 3)
{
  let retries = maxRetry;
  let subError: any[] = [];
  return (src: Observable<T>): Observable<T> =>
    src.pipe(
      retryWhen(error =>
        error.pipe(
          delay(delayMs),
          mergeMap(error =>
          {
            subError.push(error);
            return --retries > 0
              ? of(error)
              : throwError({ error: `Превышено максимальное количество попыток ${maxRetry}`, subError })
          })
        )
      )
    );
}

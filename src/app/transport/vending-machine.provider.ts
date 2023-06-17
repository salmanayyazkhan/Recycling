import {Injectable} from '@angular/core';
import {LogEntry, LogEntryResponse} from "./models/entry-log";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VendingMachineProvider {

  constructor(private http: HttpClient) {
  }

  entryLog(stationId: string, request: LogEntry): Observable<LogEntryResponse> {
    console.log(request);
    return this.http.post<LogEntryResponse>(`recycling/station/logEntry`,
      request, {
        headers: {
          'auth-key': '2424222',
          'station-id': stationId
        }
      });
  }
}


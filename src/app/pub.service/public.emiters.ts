import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PublicEmitter {
    onSearchClick: EventEmitter<any> = new EventEmitter();
    plotEmitter: EventEmitter<any> = new EventEmitter();
    constructor() { }
    emitSearchOnClick(selectedSity) {
        this.onSearchClick.emit(selectedSity);
    }
    getSearchOnClickEmitter() {
        return this.onSearchClick;
    }
    emitplotEmitter(plots) {
        this.plotEmitter.emit(plots);
    }
    getemitplotEmitter() {
        return this.plotEmitter;
    }
}
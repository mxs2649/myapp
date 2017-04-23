import {Http} from "@angular/http";
import { Injectable } from '@angular/core';
import 'lodash';
declare var _;
declare var escher: any;

@Injectable()
export class EscherService {

  constructor(private http: Http) { }

}

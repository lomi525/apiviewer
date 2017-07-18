import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NativeRequestService } from "app/services/native-request.service";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @Input() request: any = {
    url: '',
    mothod: 'GET',
    body: {
    },
    header: {
    }
  };

  req: any;
  @Output() responseChange = new EventEmitter<Response>();
  @Output() saveEvent = new EventEmitter<String>();



  constructor(private nativeRequestService: NativeRequestService) {
    this.req = {
      dddd: 3333
    }
  }

  get formdata(): any {
    if (!this.request.body) return [];
    return this.request.body.formdata || [];
  }

  ngOnInit() {
    this.req = {
      dddd: 3333
    }
  }
  get method() {
    return this.request.method ? this.request.method : 'GET';
  }

  get mode() {
    return this.request.body ? this.request.body.mode : 'form-data';
  }

  onSend() {
    console.log(this.request);
    let req = new Request(this.request.url, {
      method: this.request.method,
      headers: this.request.headers,
      body: {},
      mode: 'no-cors',  // "same-origin" | "no-cors" | "cors"
      credentials: 'same-origin',   //"omit" | "same-origin" | "include"
      cache: 'default'     //"default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached"
    });

    this.nativeRequestService.request(req).then(response => {
      //header
      //response.headers.forEach(function (val, key) { console.log(key + ' -------> ' + val); });
      //response.text().then(data => console.log('----------->',data)); 
      this.responseChange.emit(response);
    }, error => {
      console.log(error)
    });
  }


  onSave() {
    this.saveEvent.emit('save');
  }
}
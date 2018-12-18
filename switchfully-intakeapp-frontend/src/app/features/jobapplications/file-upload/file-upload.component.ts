import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadWithData } from 'src/app/core/jobapplications/classes/file';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiUrl } from 'src/app/core/apiUrl/apiUrl';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  public progress: number;
  public message: string;

  fileupload: FileUploadWithData;

  newUploadForm = new FormGroup({
    data: new FormControl(''),
    formdata: new FormControl('')
  })

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', `http://localhost:59089/api/Files`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }

  uploadv2(data: string, files) {
    console.log(files);

    const formData = new FormData();

    for (let file of files){
      formData.append(file.name, file);
      formData.append("testdata", data);
    }

    const uploadReq = new HttpRequest('POST', `http://localhost:59089/api/Files`, formData, {
      responseType: 'text'
    });

    this.http.request(uploadReq)
      .subscribe(event => {
     if (event.type === HttpEventType.Response)
          console.log(event.body.toString());
      });


    console.log(formData);
  }
}

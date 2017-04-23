import { Component, ElementRef, OnInit, Input} from '@angular/core';
import {Http} from "@angular/http";
import { AppDataLoader } from 'app/dataloader.service';
import { EscherService } from 'app/eschermap/escherservice.service';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import 'lodash';
declare var _;
declare var escher: any;
import 'rxjs/add/operator/map'


@Component({
  selector: 'app-eschermap',
  templateUrl: './eschermap.component.html',
  styleUrls: ['./eschermap.component.css']
})

export class MetaboliteVisualizationComponent implements OnInit {

  //Declare all the variables required.
  private d3: D3;
  private element: any;
  private recon: any;
  private data: any;
  private pathway =  "e_coli_core.Core metabolism";

  //Declare options to be used by Escher map.
  private options = {
    use_3d_transform: true,
    enable_editing: true,
    enable_keys: true,
    text_label: true,
    enable_tooltips: true,
    scroll_behavior: 'zoom',
    full_screen_button: true,
  }

  constructor(
    private el:ElementRef,
    private http: Http,
    private loader: AppDataLoader,
    private elementRef: ElementRef,
    private escher: EscherService,
    d3Service: D3Service) {
     this.d3 = d3Service.getD3();
   }

   /*
   * @parameter: color : string
   */
  changeColor(color){
    let field = this.d3.select(this.elementRef.nativeElement).selectAll('path.segment');
    field.style('stroke',color)
  }

  ngOnInit() {
    this.loader.get('recon2', (recon) => {
      this.recon =recon;
      let element = this.d3.select(this.elementRef.nativeElement).select('#map_container_3');
      this.element = element;
    });

    this.http.get(`assets/mydata.json`).map(data => data.json()).subscribe(
      data =>{
        this.data = data,
        escher.Builder(data, this.escherModelForPathway(this.recon, this.pathway), null, this.element, this.options),
        this.parseNodes(this.data);// to show nodes
      },
      err=>{

      }
    );

  }


  escherModelForPathway(model, pathway) {
    return {
      metabolites: _.values(model.metabolites),
      reactions: _.values(model.reactions).filter(x => x['subsystem'] == pathway),
      genes: []
    }
  }

  /***
  * check extension of the file
  */
  public fileError: boolean = false;
  public jsonFile: any;
  public mimeTypes: any = ['application/json'];
  public checkextension(event) {
    let file = (event.srcElement || event.target).files;
    if (file.length) {
      let valueIndex = this.mimeTypes.indexOf(file[0].type);
      if (valueIndex == -1) {
        this.fileError = true
      } else {
        this.readThis(event.target);
        this.fileError = false
      }
    }
  }

  /*
  * Build map with new data
  */
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.readAsText(file);
    myReader.onloadend = (e) => {
      this.jsonFile = JSON.parse(myReader.result);
      escher.Builder(this.jsonFile, this.escherModelForPathway(this.recon, this.pathway), null, this.element, this.options)
      this.parseNodes(this.jsonFile);
    }
  }


  /*
  * @parameter: data: object (json file data )
  */
  parseNodes(data){
      var data = data[1].nodes;
      let d: any;
      let cdata = [];
      for (d in data) {
          for (let key in data[d]) {
            if (key == 'node_type') {
                cdata.push(data[d][key]);
            }
          }
      }
      this.parseFinalData(cdata);
  }
  /*
  * @dependency: parseNodes()
  * @parameter: arr : Array
  */
  public nodes = [];
  parseFinalData(arr){
    this.nodes.length = 0;
    var nodes = {};
    for (var i = 0; i < arr.length; i++) {
      nodes[arr[i]] = 1 + (nodes[arr[i]] || 0);
    }
    for (let k in nodes) {
      this.nodes.push({
        name: k,
        count:nodes[k]
      })
    }
  }
}

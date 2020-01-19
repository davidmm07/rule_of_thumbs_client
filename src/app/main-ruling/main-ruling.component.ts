import { Component, OnInit } from '@angular/core';
import { IgxIconService } from "igniteui-angular"

@Component({
  selector: 'app-main-ruling',
  templateUrl: './main-ruling.component.html',
  styleUrls: ['./main-ruling.component.scss']
})
export class MainRulingComponent implements OnInit {

  constructor(private iconService: IgxIconService) { }

  ngOnInit() {
    this.iconService.addSvgIcon("thumbsup", "assets/img/like.svg", "filter-icons");    
    this.iconService.addSvgIcon("thumbsdown", "assets/img/dislike.svg", "filter-icons");    
  }

}

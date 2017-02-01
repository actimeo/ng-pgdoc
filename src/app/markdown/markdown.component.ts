import {Component, Input, OnChanges} from '@angular/core';

declare var marked;

@Component({
  selector: 'pr-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnChanges {
  private marked: any;
  private mdContent: string;

  @Input() content;

  constructor() {
    this.marked = marked;
  }

  ngOnChanges() {
    if (typeof this.content != 'undefined' && this.content != null && this.content.length != 0) {
      this.mdContent = this.marked.parse(this.content);
    }else{
      this.mdContent = "Source undefined";
    }
  }

}

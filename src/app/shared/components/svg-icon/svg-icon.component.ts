import { Component, Input, ChangeDetectionStrategy, ElementRef, Renderer2, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-svg-icon',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent implements OnInit {
  path;

  @Input() name;
  @Input() url;
  @Input() width;
  @Input() height;
  @Input() fill;

  constructor(private http: HttpClient, private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
    this.path = this.url ? this.url : `/dashboard/assets/svg/${this.name}.svg`;
    this.loadSvg();
  }

  loadSvg() {
    this.http.get(this.path, { responseType: 'text' }).subscribe(
      res => {
        // get our element and clean it out
        const element = this.el.nativeElement;
        element.innerHTML = '';
        // get response and build svg element
        const parser = new DOMParser();
        const svg = parser.parseFromString(res, 'image/svg+xml');
        // insert the svg result
        const svgElement = svg.documentElement;
        // set width, height and fill
        svgElement.setAttribute('style', `
          ${this.width ? 'width:' + this.width + 'px;' : ''}
          ${this.height ? 'height:' + this.height + 'px;' : ''}
          ${this.fill ? 'fill: #' + this.fill + ';' : ''}
        `);
        this.renderer.appendChild(element, svgElement);
      },
      err => {
        console.error(err);
      },
    );
  }
}

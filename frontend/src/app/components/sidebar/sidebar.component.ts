import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  title = 'School Results'

  handleSidebarToggle = () => {
    this.toggleSidebar.emit(!this.isExpanded);
    if (this.title === ''){
      this.title = "School Results"
    } else {
      this.title = ''
    }
  }

  constructor() { }

  ngOnInit() {
  }

}

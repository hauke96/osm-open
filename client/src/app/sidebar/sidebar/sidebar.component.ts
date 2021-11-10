import { Component } from '@angular/core';
import packageInfo from '../../../../package.json';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  version = packageInfo.version;
  sourceRepoUrl = environment.sourceRepoUrl;
}

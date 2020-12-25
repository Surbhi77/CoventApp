import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';

@Component({
  selector: 'ngx-reviewer-listing',
  templateUrl: './reviewer-listing.component.html',
  styleUrls: ['./reviewer-listing.component.scss']
})
export class ReviewerListingComponent {

  settings = {
    actions: {
      add: false,
      position: 'right' 
      },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'S.no',
        type: 'number',
        filter: false
      },
      firstName: {
        title: 'Name',
        type: 'string',
        filter: false
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: false
      },
      username: {
        title: 'Status',
        type: 'string',
        filter: false
      },
      lastname: {
        title: 'Created Date',
        type: 'string',
        filter: false
      },
      age: {
        title: 'Verification Status',
        type: 'number',
        filter: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    console.log(data)
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}

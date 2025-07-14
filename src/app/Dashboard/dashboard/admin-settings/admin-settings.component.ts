import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
  isvisible: boolean = false; // Table/grid is default view
  rolesData = [
    { RoleID: 1, RoleName: 'Admin' },
    { RoleID: 2, RoleName: 'Manager' },
    { RoleID: 3, RoleName: 'User' }
  ];

  permissionsData = [
    { PermissionID: 1, PermissionName: 'View Dashboard' },
    { PermissionID: 2, PermissionName: 'Edit Users' },
    { PermissionID: 3, PermissionName: 'Manage Assets' }
  ];

  rolePermissionsData = [
    { RoleName: 'Admin', PermissionName: 'View Dashboard' },
    { RoleName: 'Admin', PermissionName: 'Edit Users' },
    { RoleName: 'Manager', PermissionName: 'View Dashboard' },
    { RoleName: 'Manager', PermissionName: 'Manage Assets' },
    { RoleName: 'User', PermissionName: 'View Dashboard' }
  ];

  constructor() {}

  ngOnInit(): void {
    // In a real app, fetch data from API here
  }
}

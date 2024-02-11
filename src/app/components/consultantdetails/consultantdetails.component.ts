import { Component,Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-consultantdetails',
  templateUrl: './consultantdetails.component.html',
  styleUrls: ['./consultantdetails.component.css']
})
export class ConsultantdetailsComponent implements OnInit{
  @Input() cardWidth: string = '1000px';
  @Input() cardheight: string = '800px';
  projects: any[] = [];
  statusMenu: MenuItem[] | undefined;
  selectedStatus: string = '';
constructor(private auth:AuthService,private message:MessageService){}
  ngOnInit(): void {
    this.auth.getProjectsbyConsultantUsername(this.auth.getUsername()).subscribe( 
      (response)=> { 
        this.projects=response; 
      console.log(this.projects);
      }) 
      this.statusMenu  = [
        {
          label: 'Not Started',
          icon: 'pi pi-circle-off',
          styleClass: 'not-started-icon',
        },
        {
          label: 'In Progress',
          icon: 'pi pi-spinner',
          styleClass: 'in-progress-icon',
        },
        {
          label: 'Done',
          icon: 'pi pi-check',
          styleClass: 'done-icon',
        },
      ];
  }

  getIconClass(status: string): string {
    switch (status) {
      case status="Not Started":
        return 'pi pi-circle-off'; // Icon for Not Started
      case status="In Progress":
        return 'pi pi-spinner'; // Icon for In Progress
      case status="Done":
        return 'pi pi-check'; 
      default:
        return ''; 
    }
  }
  changeStatus(project: any): void {
    console.log('Selected status:', project.selectedStatus); 
    
    if (project.selectedStatus) {
      this.auth.changeProjectStatus(project.titre, project.selectedStatus).subscribe(
        (response) => {
          console.log('Status changed successfully:', response);
          this.message.add({ severity: 'success', summary: 'Success', detail: 'Status changed successfully' });
  
          
          project.status = project.selectedStatus;
        },
        (error) => {
          console.error('Error changing status:', error);
          this.message.add({ severity: 'error', summary: 'Error', detail: 'Problem' });
        }
      );
    } else {
      console.error('No status selected');
    }
  }
  

}
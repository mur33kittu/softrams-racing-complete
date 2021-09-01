import { Component, OnInit } from '@angular/core'
import { AppService } from '../app.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = []
  constructor (public appService: AppService, private router: Router) {
    this.members = []
  }

  ngOnInit () {
    this.getMembers()
  }

  getMembers () {
    this.appService.getMembers().subscribe(members => {
      this.members = members
    })
  }

  goToAddMemberForm () {
    console.log(`Hmmm...we are going to navigate add members page :)`)
    this.router.navigate(['/addMembers'])
  }

  editMemberByID (id: number) {
    console.log('here in edit', id)
    this.router.navigateByUrl('/addMembers', {
      state: { member: this.members.find(member => member.id === id) }
    })
  }

  deleteMemberById (id: number) {
    this.appService.deleteMember(id).subscribe(members => {
      this.appService
        .getMembers()
        .subscribe(members => (this.members = members))
    })
  }
}

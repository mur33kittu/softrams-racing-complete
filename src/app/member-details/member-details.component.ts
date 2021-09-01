import { Component, OnInit, OnChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AppService } from '../app.service'
import { Router } from '@angular/router'

interface Member {
  firstName: string
  lastName: string
  jobTitle: string
  team: string
  status: string
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member
  memberForm: FormGroup
  submitted = false
  alertType: String
  alertMessage: String
  teams = []

  constructor (
    private fb: FormBuilder,
    public appService: AppService,
    private router: Router
  ) {
    this.memberForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      team: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  ngOnInit () {
    this.getTeams();
    const member = history.state && history.state.member
    if (member) {
      delete member['id']
      this.memberForm.setValue(member)
      this.memberForm.controls['team'].setValue(member.team, { onlySelf: true })
    }
  }

  getTeams() {
    this.appService.getTeams().subscribe(teams => (this.teams = teams))
  }

  ngOnChanges () {
    this.appService.getTeams().subscribe(teams => (this.teams = teams))
  }

  onSubmit (form: FormGroup) {
    this.memberModel = form.value
    this.appService.addMember(this.memberModel).subscribe(member => {
      this.appService.members.push(member)
      this.router.navigate(['/members'])
    })
  }
}

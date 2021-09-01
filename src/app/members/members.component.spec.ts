import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  inject,
  TestBed,
  tick
} from '@angular/core/testing'

import { MembersComponent } from './members.component'

import { Router } from '@angular/router'

import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { of } from 'rxjs'
import { AppService } from '../app.service'
import { delay } from 'rxjs/operators'
import * as Rx from 'rxjs'

describe('MembersComponent', () => {
  let component: MembersComponent
  let fixture: ComponentFixture<MembersComponent>

  const members = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Driver',
      team: 'Formula 1 - Car 77',
      status: 'Active'
    },
    {
      id: 2,
      firstName: 'Alex',
      lastName: 'Sainz',
      jobTitle: 'Driver',
      team: 'Formula 1 - Car 78',
      status: 'Active'
    },
    {
      firstName: 'Gayathri',
      lastName: 'Gopinath',
      jobTitle: 'Full Stack Developer',
      team: 'Formula 2 - Car 63',
      status: 'Active',
      id: 3
    },
    {
      firstName: 'Alex',
      lastName: 'Sainz',
      jobTitle: 'Driver',
      team: 'Formula 1 - Car 78',
      status: 'Active',
      id: 4
    },
    {
      firstName: 'Murthy',
      lastName: 'Guruswamy',
      jobTitle: 'Full Stack Developer',
      team: 'Formula 2 - Car 63',
      status: 'Active',
      id: 5
    },
    {
      firstName: 'Murthy',
      lastName: 'Guruswamy',
      jobTitle: 'Full Stack Developer',
      team: 'Deutsche Tourenwagen Masters - Car 118',
      status: 'Active',
      id: 6
    },
    {
      firstName: 'Gayathri',
      lastName: 'Gopinath',
      jobTitle: 'Full Stack Developer',
      team: 'World Rally Championship - Car 90',
      status: 'Active',
      id: 7
    }
  ]
  const getMembersStub = {
    getMembers: () => {
      return of([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          jobTitle: 'Driver',
          team: 'Formula 1 - Car 77',
          status: 'Active'
        },
        {
          id: 2,
          firstName: 'Alex',
          lastName: 'Sainz',
          jobTitle: 'Driver',
          team: 'Formula 1 - Car 78',
          status: 'Active'
        },
        {
          firstName: 'Gayathri',
          lastName: 'Gopinath',
          jobTitle: 'Full Stack Developer',
          team: 'Formula 2 - Car 63',
          status: 'Active',
          id: 3
        },
        {
          firstName: 'Alex',
          lastName: 'Sainz',
          jobTitle: 'Driver',
          team: 'Formula 1 - Car 78',
          status: 'Active',
          id: 4
        },
        {
          firstName: 'Murthy',
          lastName: 'Guruswamy',
          jobTitle: 'Full Stack Developer',
          team: 'Formula 2 - Car 63',
          status: 'Active',
          id: 5
        },
        {
          firstName: 'Murthy',
          lastName: 'Guruswamy',
          jobTitle: 'Full Stack Developer',
          team: 'Deutsche Tourenwagen Masters - Car 118',
          status: 'Active',
          id: 6
        },
        {
          firstName: 'Gayathri',
          lastName: 'Gopinath',
          jobTitle: 'Full Stack Developer',
          team: 'World Rally Championship - Car 90',
          status: 'Active',
          id: 7
        }
      ])
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [HttpClientModule, RouterModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate')
          }
        },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: AppService, useValue: getMembersStub }
      ]
    }).compileComponents()
    fixture = TestBed.createComponent(MembersComponent)
    component = fixture.debugElement.componentInstance
  }))

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should call ngOnInit', () => {
    const service = fixture.debugElement.injector.get(AppService)
    component.ngOnInit()
    expect(component.members).toEqual(members)
  })

  it(`should navigate to add members page when click on addMemberButton`, inject(
    [Router],
    (router: Router) => {
      fixture.detectChanges()
      let button = fixture.debugElement.nativeElement.querySelector('button')
      console.log(button)
      button.click()
      fixture.whenStable().then(() => {
        expect(component.goToAddMemberForm).toHaveBeenCalled()
      })

      // router.navigate(['/addMember'], {
      //   state: { member: component.members[0] }
      // })
      // expect(router.navigate).toHaveBeenCalledWith(['/addMember'], {
      //   state: { member: component.members[0] }
      // })
      // })
    }
  ))

  it(`should navigate to add members page when clicked on fa fa-edit blue-color`, inject(
    [Router],
    (router: Router) => {
      // router.navigate(['/addMember'], {
      //   state: { member: component.members[0] }
      // })
      // expect(router.navigate).toHaveBeenCalledWith(['/addMember'], {
      //   state: { member: component.members[0] }
      // })
      fixture.detectChanges()
      let button = fixture.debugElement.nativeElement.querySelectorAll('i')[0]
      // console.log(button)
      button.click()
      fixture.whenStable().then(() => {
        expect(component.editMemberByID).toHaveBeenCalled()
      })
    }
  ))

  it(`should navigate to add members page when clicked on fa fa-edit blue-color`, inject(
    [Router],
    (router: Router) => {
      // router.navigate(['/addMember'], {
      //   state: { member: component.members[0] }
      // })
      // expect(router.navigate).toHaveBeenCalledWith(['/addMember'], {
      //   state: { member: component.members[0] }
      // })
      fixture.detectChanges()
      let button = fixture.debugElement.nativeElement.querySelectorAll('i')[1]
      // console.log(button)
      button.click()
      fixture.whenStable().then(() => {
        expect(component.deleteMemberById).toHaveBeenCalled()
      })
    }
  ))
})

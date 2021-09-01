import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  inject,
  TestBed
} from '@angular/core/testing'

import { MemberDetailsComponent } from './member-details.component'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AppService } from '../app.service'
import { of } from 'rxjs'
import { DebugElement } from '@angular/core'
import { By } from 'protractor'

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent
  let fixture: ComponentFixture<MemberDetailsComponent>

  const getTeamsStub = {
    getTeams: () => {
      return of([
        {
          id: 1,
          teamNameName: 'Formula 1 - Car 77'
        },
        {
          id: 2,
          teamName: 'Formula 1 - Car 8'
        },
        {
          id: 3,
          teamName: 'Formula 2 - Car 54'
        },
        {
          id: 4,
          teamName: 'Formula 2 - Car 63'
        },
        {
          id: 5,
          teamName: 'Deutsche Tourenwagen Masters - Car 117'
        },
        {
          id: 6,
          teamName: 'Deutsche Tourenwagen Masters - Car 118'
        },
        {
          id: 7,
          teamName: 'World Endurance Championship - Car 99'
        },
        {
          id: 8,
          teamName: 'World Endurance Championship - Car 5'
        },
        {
          id: 9,
          teamName: 'World Rally Championship - Car 77'
        },
        {
          id: 10,
          teamName: 'World Rally Championship - Car 90'
        }
      ])
    }
  }

  const teams = [
    {
      id: 1,
      teamNameName: 'Formula 1 - Car 77'
    },
    {
      id: 2,
      teamName: 'Formula 1 - Car 8'
    },
    {
      id: 3,
      teamName: 'Formula 2 - Car 54'
    },
    {
      id: 4,
      teamName: 'Formula 2 - Car 63'
    },
    {
      id: 5,
      teamName: 'Deutsche Tourenwagen Masters - Car 117'
    },
    {
      id: 6,
      teamName: 'Deutsche Tourenwagen Masters - Car 118'
    },
    {
      id: 7,
      teamName: 'World Endurance Championship - Car 99'
    },
    {
      id: 8,
      teamName: 'World Endurance Championship - Car 5'
    },
    {
      id: 9,
      teamName: 'World Rally Championship - Car 77'
    },
    {
      id: 10,
      teamName: 'World Rally Championship - Car 90'
    }
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: AppService, useValue: getTeamsStub },
        HttpClient,
        FormBuilder,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents()
    fixture = TestBed.createComponent(MemberDetailsComponent)
    component = fixture.debugElement.componentInstance
  }))

  beforeEach(() => {
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call ngOnInit', () => {
    const service = fixture.debugElement.injector.get(AppService)
    component.ngOnInit()
    window.history.pushState(
      {
        member: {
          firstName: 'Murthy',
          lastName: 'Guruswamy',
          jobTitle: 'Full Stack Developer',
          team: 'Formula 2 - Car 63',
          status: 'Active',
          id: 5
        }
      },
      '',
      ''
    )
    expect(component.teams).toEqual(teams)
  })

  it('should call ngOnChanges', () => {
    const service = fixture.debugElement.injector.get(AppService)
    component.ngOnChanges()
    expect(component.teams).toEqual(teams)
  })

  xit('should show a validation error if the first name was touched but left empty', () => {
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      console.log(component.memberForm.controls['firstName'])
      component.memberForm.controls['firstName'].setValue('Murthy')
    })
    expect(component.memberForm.controls['firstName'].value).toEqual('Murthy')
  })

  it(`should navigate to add members page when click on addMemberButton`, inject(
    [Router],
    (router: Router) => {
      fixture.detectChanges()
      let button = fixture.debugElement.nativeElement.querySelector('button')
      console.log(button)
      button.click()
      fixture.whenStable().then(() => {
        expect(component.onSubmit).toHaveBeenCalled()
      })
    }
  ))
})

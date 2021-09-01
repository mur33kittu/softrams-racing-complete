import { TestBed, inject } from '@angular/core/testing'

import { AppService } from './app.service'

import { HttpClientModule } from '@angular/common/http'

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientModule]
    })
  })

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy()
  }))

  it('#getMembers should return value from a promise', inject(
    [AppService],
    (service: AppService) => {
      service
        .getMembers()
        .toPromise()
        .then(value => {
          expect(value).toBe('promise value')
        })
    }
  ))

  it('#getTeams should return value from a promise', inject(
    [AppService],
    (service: AppService) => {
      service
        .getTeams()
        .toPromise()
        .then(value => {
          expect(value).toBe('promise value')
        })
    }
  ))

  it('#delete member should delete a object from the list', inject(
    [AppService],
    (service: AppService) => {
      const id = 4
      service
        .deleteMember(id)
        .toPromise()
        .then(value => {
          expect(value).toBe(null)
        })
    }
  ))
})

import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ByteBuilderFormService } from './byte-builder-form.service';
import {ProductService} from "./product.service";
import {State} from "../common/state";

describe('ByteBuilderFormService', () => {
  let service: ByteBuilderFormService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ByteBuilderFormService],
    });
    service = TestBed.inject(ByteBuilderFormService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();

  });

  it('should be created', () => {
    const dummyStates: State[] =[
      {
        id: 1,
        stateName: "California",
      },
      {
        id: 2,
        stateName: "Nevada",
      },
      {
        id: 3,
        stateName: "Oregon",
      }
      ,{
        id: 4,
        stateName: "Texas",
      }

    ];
    service.getStatesTest().subscribe(posts => {
      expect(posts.length).toBe(4);
      expect(posts).toEqual(dummyStates);
    });
    const request = httpMock.expectOne(`${service.states}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyStates);
    // expect(service).toBeTruthy();
  });
});

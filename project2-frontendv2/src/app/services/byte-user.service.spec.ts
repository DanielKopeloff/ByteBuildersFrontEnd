import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ByteUserService } from './byte-user.service';
import {Product} from "../common/product";
import {ByteUser} from "../common/byte-user";

describe('ByteUserService', () => {
  let service: ByteUserService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ByteUserService],
    });
    service = TestBed.inject(ByteUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();

  });

  it('should be created', () => {
    const dummyUser: ByteUser[] = [
      {
        id: 12,
        byteRole: 1,
        email: "ag@gmail.com",
        firstName: "Daniel",
        lastName: 'Reyes',
        password: "password",
        profilePic: "asaasdascascascascewasbebav",
        userCreated: null,
        userTerminated: null,
        username: "dantheman",
      },
      {
        id: 13,
        byteRole: 1,
        email: "af@gmail.com",
        firstName: "Daniel",
        lastName: 'K',
        password: "password",
        profilePic: "asaasdsdasdasascascascascewasbebav",
        userCreated: null,
        userTerminated: null,
        username: "dantheotherman",
      }
    ];
    service.getUserTest().subscribe( posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyUser);
    });
    const request = httpMock.expectOne(`${service.baseUrlTest}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyUser);
    //expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ReviewService } from './review.service';
import {Review} from "../common/review";

describe('ReviewService', () => {
  let service: ReviewService;
  let httpMock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewService],
    });
    service = TestBed.inject(ReviewService);
    httpMock = TestBed.get(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();

  });

  it('should retrieve from API: ', () => {
    const dummyRev: Review[] = [
      {
        id: 38,
        comment: "comment" ,
        reviewCreated: "Review Example",
        reviewTerminated: "Review Terminated",
        rating: 9,
        byteOrderId: 23,
      }
    ];
    service.getReviewsTest().subscribe(posts => {
      expect(posts.length).toBe(1);
      expect(posts).toEqual(dummyRev);
    });
    const  request = httpMock.expectOne(`${service.getAllTest}`)
    //expect(service).toBeTruthy();
    expect(request.request.method).toBe('GET');

    request.flush(dummyRev);
  });
});

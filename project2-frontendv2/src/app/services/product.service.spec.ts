import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import {Product} from '../common/product';


describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.get(ProductService);
    httpMock = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();

  });

  it('Should retrieve products from API via gets', () => {
    const dummyposts: Product[] = [
      {
        id: 36,
        description: "AMD Test RYZEN 2 3700X 8-Core 3.6 GHz (4.4 GHz Max Boost) Socket AM4 65W 100-100000071BOX Desktop Processor",
        stock: 20,
        price: 319.99,
        sku: "N34E16819113567",
        picture: "",
        rating: 3,
        productCreated: null,
        productTerminated: null,
        isActive: true,
      },
      {
        id: 37,
        description: "AMD Test RYZEN 4 3700X 8-Core 3.6 GHz (4.4 GHz Max Boost) Socket AM4 65W 100-100000071BOX Desktop Processor",
        stock: 20,
        price: 400.99,
        sku: "N33E16819113567",
        picture: "",
        rating: 3,
        productCreated: null,
        productTerminated: null,
        isActive: true,
      }
    ];
    service.getPostTest().subscribe(posts => {
      //expect(posts.length)
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyposts);
    });
    const request = httpMock.expectOne(`${service.baseUrlTest}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyposts);
  });
});

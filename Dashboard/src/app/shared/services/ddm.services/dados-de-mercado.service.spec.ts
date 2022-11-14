import { TestBed } from '@angular/core/testing';

import { DadosDeMercadoService } from './dados-de-mercado.service';

describe('DadosDeMercadoService', () => {
  let service: DadosDeMercadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosDeMercadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

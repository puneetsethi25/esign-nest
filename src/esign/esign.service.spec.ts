import { Test, TestingModule } from '@nestjs/testing';
import { EsignService } from './esign.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('EsignService', () => {
  let service: EsignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            () => ({
              API_TOKEN: 'test-token',
              API_BASE_URL: 'https://sandbox.opensignlabs.com/api/v1/',
            }),
          ],
        }),
      ],
      providers: [EsignService],
    }).compile();

    service = module.get<EsignService>(EsignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

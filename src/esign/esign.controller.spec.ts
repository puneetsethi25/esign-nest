// esign.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { EsignController } from './esign.controller';
import { EsignService } from './esign.service';

describe('EsignController', () => {
  let controller: EsignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsignController],
      providers: [
        {
          provide: EsignService,
          useValue: {
            submitEsign: jest.fn().mockResolvedValue({ success: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<EsignController>(EsignController);
  });

  it('should upload file and return its details', () => {
    // Simulate file upload response
    const file = { filename: 'test.pdf', path: './uploads/test.pdf' } as Express.Multer.File;
    const result = controller.uploadFile(file);
    expect(result).toEqual({ filename: 'test.pdf', path: './uploads/test.pdf' });
  });

  // Add tests for preview and submission endpoints similarly.
});

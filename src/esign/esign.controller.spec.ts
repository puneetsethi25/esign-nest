import { Test, TestingModule } from '@nestjs/testing';
import { EsignController } from './esign.controller';
import { EsignService } from './esign.service';
import { Response } from 'express';

describe('EsignController', () => {
  let controller: EsignController;
  let service: EsignService;

  const mockEsignService = {
    initiateWorkflow: jest.fn().mockResolvedValue({ message: 'Success', objectId: '1234' }),
    role2Action: jest.fn().mockResolvedValue({ signurl: [{ email: 'prole3@yopmail.com', url: 'https://example.com/sign' }] }),
    // You can add other mocked methods (like role2SignAndUpdate or getTemplateById) as needed.
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsignController],
      providers: [
        {
          provide: EsignService,
          useValue: mockEsignService,
        },
      ],
    }).compile();

    controller = module.get<EsignController>(EsignController);
    service = module.get<EsignService>(EsignService);
  });

  describe('uploadFile', () => {
    it('should return file details', () => {
      // Simulate a file upload by providing a fake file object.
      const file = { filename: 'test.pdf', path: './uploads/test.pdf' } as Express.Multer.File;
      const result = controller.uploadFile(file);
      expect(result).toEqual({ filename: 'test.pdf', path: './uploads/test.pdf' });
    });
  });

  describe('previewFile', () => {
    it('should call res.sendFile with correct file path', () => {
      const filename = 'test.pdf';
      // Create a mock response object with a sendFile method.
      const res = { sendFile: jest.fn() } as unknown as Response;
      controller.previewFile(filename, res);
      // __dirname in the compiled code will be "dist", so we expect a string that includes "uploads/test.pdf"
      expect(res.sendFile).toHaveBeenCalledWith(expect.stringContaining('uploads/test.pdf'));
    });
  });

  describe('initiateWorkflow', () => {
    it('should return workflow initiation result', async () => {
      const payload = { file: 'base64data', title: 'Offer Letter', signers: [] };
      const result = await controller.initiateWorkflow(payload);
      expect(result).toEqual({ message: 'Success', objectId: '1234' });
      expect(mockEsignService.initiateWorkflow).toHaveBeenCalledWith(payload);
    });
  });

  describe('role2Action', () => {
    it('should return role2 signing result', async () => {
      const payload = { templateId: 'doc123' };
      const result = await controller.role2Action(payload);
      expect(result).toEqual({ signurl: [{ email: 'prole3@yopmail.com', url: 'https://example.com/sign' }] });
      expect(mockEsignService.role2Action).toHaveBeenCalledWith(payload);
    });
  });
});

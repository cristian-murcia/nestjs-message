import { Test, TestingModule } from '@nestjs/testing';
import { MailerProviders } from './mailer';

describe('Mailer', () => {
  let provider: MailerProviders;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerProviders],
    }).compile();

    provider = module.get<MailerProviders>(MailerProviders);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

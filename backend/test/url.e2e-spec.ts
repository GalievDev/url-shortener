import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from '../src/url/url.service';
import { UrlEntity } from '../src/url/url.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UrlService', () => {
  let service: UrlService;
  let repo: Repository<UrlEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: getRepositoryToken(UrlEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
    repo = module.get<Repository<UrlEntity>>(getRepositoryToken(UrlEntity));

    jest.spyOn(repo, 'create').mockImplementation((entity) => {
      return { ...entity } as UrlEntity;
    });
  });

  it('should create a link with a unique alias', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
    jest
      .spyOn(repo, 'save')
      .mockImplementation(async (url) => url as UrlEntity);

    const url = await service.createUrl('https://example.com', 'customAlias');
    expect(url.shortUrl).toBe('customAlias');
    expect(repo.save).toHaveBeenCalled();
  });

  it('should throw an error if alias is not unique', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(new UrlEntity());

    await expect(
      service.createUrl('https://example.com', 'customAlias'),
    ).rejects.toThrow('Alias already in use');
  });

  it('should redirect to the original URL', async () => {
    const url = new UrlEntity();
    url.originalUrl = 'https://example.com';
    url.clickCount = 0;
    url.transitions = [];
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(url);
    jest
      .spyOn(repo, 'save')
      .mockImplementation(async (entity) => entity as UrlEntity);

    const originalUrl = await service.getOriginalUrl(
      'customAlias',
      '127.0.0.1',
    );
    expect(originalUrl).toBe('https://example.com');
  });
});

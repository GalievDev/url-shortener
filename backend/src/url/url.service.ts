import { Injectable, NotFoundException, GoneException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './url.entity';
import * as shortid from 'shortid';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {}

  async createUrl(
    originalUrl: string,
    alias?: string,
    expiresAt?: Date,
  ): Promise<UrlEntity> {
    const shortUrl = alias || shortid.generate();
    const existing = await this.urlRepository.findOne({ where: { shortUrl } });
    if (existing) throw new Error('Alias already in use');

    const newUrl = this.urlRepository.create({
      originalUrl,
      shortUrl,
      expiresAt,
    });
    return await this.urlRepository.save(newUrl);
  }

  async getOriginalUrl(shortUrl: string, ip: string): Promise<string> {
    const url = await this.urlRepository.findOne({ where: { shortUrl } });
    if (!url) throw new NotFoundException('Short URL not found');
    if (url.expiresAt && new Date() > url.expiresAt)
      throw new GoneException('URL has expired');

    url.clickCount++;
    url.transitions.push({ date: new Date(), ip });
    await this.urlRepository.save(url);

    return url.originalUrl;
  }

  async getUrlInfo(shortUrl: string): Promise<UrlEntity> {
    const url = await this.urlRepository.findOne({ where: { shortUrl } });
    if (!url) throw new NotFoundException('Short URL not found');
    return url;
  }

  async deleteUrl(shortUrl: string): Promise<void> {
    const result = await this.urlRepository.delete({ shortUrl });
    if (!result.affected) throw new NotFoundException('Short URL not found');
  }

  async getAnalytics(
    shortUrl: string,
  ): Promise<{ clickCount: number; last5IPs: string[] }> {
    const url = await this.urlRepository.findOne({ where: { shortUrl } });
    if (!url) throw new NotFoundException('Short URL not found');

    const last5IPs = url.transitions.slice(-5).map((t) => t.ip);
    return { clickCount: url.clickCount, last5IPs };
  }
}

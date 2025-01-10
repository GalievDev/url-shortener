import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Ip,
  Redirect,
} from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shortenUrl(
    @Body() body: { originalUrl: string; alias?: string; expiresAt?: Date },
  ) {
    return this.urlService.createUrl(
      body.originalUrl,
      body.alias,
      body.expiresAt,
    );
  }

  @Get(':shortUrl')
  @Redirect("", 302)
  async redirect(@Param('shortUrl') shortUrl: string, @Ip() ip: string) {
    try {
      const originalUrl = await this.urlService.getOriginalUrl(shortUrl, ip);

      if (originalUrl) {
        return { url: originalUrl };
      } else {
        return { statusCode: 404, url: null, message: 'URL not found' };
      }
    } catch {
      return { statusCode: 500, url: null, message: 'Internal Server Error' };
    }
  }

  @Get('info/:shortUrl')
  async getInfo(@Param('shortUrl') shortUrl: string) {
    return this.urlService.getUrlInfo(shortUrl);
  }

  @Delete('delete/:shortUrl')
  async deleteUrl(@Param('shortUrl') shortUrl: string) {
    await this.urlService.deleteUrl(shortUrl);
    return { message: 'Short URL deleted successfully' };
  }

  @Get('analytics/:shortUrl')
  async getAnalytics(@Param('shortUrl') shortUrl: string) {
    return this.urlService.getAnalytics(shortUrl);
  }
}

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WarcraftDataIntervalService {
    @Cron(CronExpression.EVERY_10_SECONDS)
    handleCron() {
        console.log('Every 30 minutes');
    }
}

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WowInitialiseDataService } from '../wow-initialise-data/wow-initialise-data.service';

@Injectable()
export class WarcraftDataIntervalService {
    constructor () {}
    @Cron(CronExpression.EVERY_10_SECONDS)
    handleCron() {
        console.log('Every 30 minutes');
    }
}

/* eslint-disable no-var */
import { AbstractLogger } from '../logger';
import {} from '@root/common/define/global';
declare global {
    var log: AbstractLogger;
}

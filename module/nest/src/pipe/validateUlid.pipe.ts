import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidULIDException } from '../error/error';

@Injectable()
export class ValidateULIDPipe implements PipeTransform {
    private readonly ulidPattern = /^[0-9A-Z]{26}$/;

    public transform(value: any) {
        if (value === undefined) {
            return value;
        }

        if (!this.ulidPattern.test(value)) {
            throw new InvalidULIDException();
        }
        return value;
    }
}

import { ArgumentMetadata, Injectable, PipeTransform, Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { ValidationFailException } from '../error/validation.error';

@Injectable()
export class GlobalValidationPipe implements PipeTransform {
    public async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToInstance(metatype, value);

        const errorList = await validate(object);
        if (errorList.length > 0) {
            throw new ValidationFailException(`Validation failed: ${this.formatErrorList(errorList)}`);
        }

        return object;
    }

    private formatErrorList(parentErrorList: ValidationError[]) {
        const errorMsgList: string[] = [];
        this.setErrorMsgFromValidationError(errorMsgList, parentErrorList);
        return errorMsgList.join(', ');
    }

    private setErrorMsgFromValidationError(errorMsgList: string[], errorList: ValidationError[]): void {
        errorList.forEach((error) => {
            if (error.constraints !== undefined && Object.keys(error.constraints).length > 0) {
                errorMsgList.push(...Object.values(error.constraints));
            }
            if (error.children !== undefined && error.children.length > 0) {
                this.setErrorMsgFromValidationError(errorMsgList, error.children);
            }
        });
    }

    private toValidate(metatype: Type<any>): boolean {
        const typeList: Type<any>[] = [String, Boolean, Number, Array, Object];
        return !typeList.includes(metatype);
    }
}

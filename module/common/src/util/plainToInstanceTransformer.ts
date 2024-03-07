import { ValidationFailException } from '@root/nest/error/validation.error';
import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class PlainToInstanceTransformer {
    public async plainToInstance<T, V>(cls: ClassConstructor<T>, plain: V): Promise<T> {
        const target = plainToInstance<T, V>(cls, plain);
        const errorList = await validate(target as object);

        if (errorList.length > 0) {
            throw new ValidationFailException(`${cls.name} validation failed: ${this.formatErrorList(errorList)}`);
        }
        return target;
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
}

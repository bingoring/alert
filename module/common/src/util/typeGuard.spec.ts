import { TypeGuard } from './typeGuard';

class A {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class B {
    tag: string[];
    constructor(tag: string[]) {
        this.tag = tag;
    }
}

describe('type guard test', () => {
    describe('addPropertyCondition', () => {
        it('True', () => {
            const typeGuard = new TypeGuard().addPropertyCondition('name', ['string']);
            const a = new A('alphabet');
            expect(typeGuard.test(a)).toStrictEqual(true);
        });

        it('False - non exist field', () => {
            const typeGuard = new TypeGuard().addPropertyCondition('unknownField', ['string']);
            const a = new A('alphabet');
            expect(typeGuard.test(a)).toStrictEqual(false);
        });

        it('False - not correct type', () => {
            const typeGuard = new TypeGuard().addPropertyCondition('tag', ['string']);
            const b = new B(['1', '2']);
            expect(typeGuard.test(b)).toStrictEqual(false);
        });
    });

    describe('addArrayPropertyCondition', () => {
        it('True', () => {
            const typeGuard = new TypeGuard().addArrayPropertyCondition('tag', 'string');
            const b = new B(['1', '2']);
            expect(typeGuard.test(b)).toStrictEqual(true);
        });

        it('False - not array type', () => {
            const typeGuard = new TypeGuard().addArrayPropertyCondition('name', 'string');
            const a = new A('alphabet');
            expect(typeGuard.test(a)).toStrictEqual(false);
        });

        it('False - non exist field', () => {
            const typeGuard = new TypeGuard().addArrayPropertyCondition('unknownField', 'string');
            const a = new A('alphabet');
            expect(typeGuard.test(a)).toStrictEqual(false);
        });
    });
});

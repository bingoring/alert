import { ObjectManager } from './object';

describe('ObjectManager Test', () => {
    describe('equal and notEqual', () => {
        describe('Object', () => {
            test('same object, order of key is same', () => {
                const v1 = {
                    a: 'abc',
                    b: 10,
                    c: {
                        d: 'abcd',
                        e: 300,
                        f: {
                            g: true,
                        },
                    },
                };
                const v2 = {
                    a: 'abc',
                    b: 10,
                    c: {
                        d: 'abcd',
                        e: 300,
                        f: {
                            g: true,
                        },
                    },
                };
                expect(ObjectManager.equal(v1, v2)).toBe(true);
                expect(ObjectManager.notEqual(v1, v2)).toBe(!ObjectManager.equal(v1, v2));
            });

            test('same object, order of key is different', () => {
                const v1 = {
                    a: 'abc',
                    b: 10,
                    c: {
                        d: 'abcd',
                        e: 300,
                        f: {
                            g: true,
                        },
                    },
                };
                const v2 = {
                    c: {
                        d: 'abcd',
                        f: {
                            g: true,
                        },
                        e: 300,
                    },
                    a: 'abc',
                    b: 10,
                };
                expect(ObjectManager.equal(v1, v2)).toBe(true);
                expect(ObjectManager.notEqual(v1, v2)).toBe(!ObjectManager.equal(v1, v2));
            });

            test('different object, order of key is same', () => {
                const v1 = {
                    a: 'abc',
                    b: 10,
                    c: {
                        d: 'abcd',
                        e: 300,
                        f: {
                            g: true,
                        },
                    },
                };
                const v2 = {
                    a: 'abc',
                    b: 10,
                    c: {
                        d: 'abcd',
                        e: 300,
                        f: {
                            g: false,
                        },
                    },
                };
                expect(ObjectManager.equal(v1, v2)).toBe(false);
                expect(ObjectManager.notEqual(v1, v2)).toBe(!ObjectManager.equal(v1, v2));
            });

            test('different object, order of key is different', () => {
                const v1 = {
                    a: 'abc',
                    b: 10,
                    c: {
                        d: 'abcd',
                        e: 300,
                        f: {
                            g: true,
                        },
                    },
                };
                const v2 = {
                    c: {
                        d: 'abcde',
                        f: {
                            g: true,
                        },
                        e: 300,
                    },
                    a: 'abc',
                    b: 10,
                };
                expect(ObjectManager.equal(v1, v2)).toBe(false);
                expect(ObjectManager.notEqual(v1, v2)).toBe(!ObjectManager.equal(v1, v2));
            });

            test('different object, list of key is different', () => {
                const v1 = {
                    a: 'abc',
                    b: 10,
                    c: {
                        d: 'abcd',
                        e: 300,
                        f: {
                            g: true,
                        },
                    },
                };
                const v2 = {
                    c: {
                        d: 'abcde',
                        f: {
                            g: true,
                        },
                        e: 300,
                    },
                    b: 10,
                };
                expect(ObjectManager.equal(v1, v2)).toBe(false);
                expect(ObjectManager.notEqual(v1, v2)).toBe(!ObjectManager.equal(v1, v2));
            });
        });

        describe('Array', () => {
            test('same array', () => {
                const v1List = [1, 2, 3, 4, 5, new Set([3, 4, 5]), '7', false, { a: 1, b: 2 }];
                const v2List = [1, 2, 3, 4, 5, new Set([3, 4, 5]), '7', false, { b: 2, a: 1 }];

                expect(ObjectManager.equal(v1List, v2List)).toBe(true);
                expect(ObjectManager.notEqual(v1List, v2List)).toBe(!ObjectManager.equal(v1List, v2List));
            });

            test('different array', () => {
                const v1List = [1, 2, 3, 4, 5, '7', false, { a: 1, b: 2 }, new Set([3, 4, 5])];
                const v2List = [1, 2, 3, 4, 5, new Set([3, 4, 5]), '7', false, { b: 2, a: 1 }];

                expect(ObjectManager.equal(v1List, v2List)).toBe(false);
                expect(ObjectManager.notEqual(v1List, v2List)).toBe(!ObjectManager.equal(v1List, v2List));
            });
        });

        describe('Primitive', () => {
            test('same string', () => {
                const v1 = 'abcdef';
                const v2 = 'abcdef';

                expect(ObjectManager.equal(v1, v2)).toBe(true);
                expect(ObjectManager.notEqual(v1, v2)).toBe(!ObjectManager.equal(v1, v2));
            });

            test('different string', () => {
                const v1 = 'abcdef';
                const v2 = 'abcdef ';

                expect(ObjectManager.equal(v1, v2)).toBe(false);
                expect(ObjectManager.notEqual(v1, v2)).toBe(!ObjectManager.equal(v1, v2));
            });

            test('same number', () => {
                const v1 = 100 * 10000000;
                const v2 = 100 * 10000000;

                expect(ObjectManager.equal(v1, v2)).toBe(true);
                expect(ObjectManager.notEqual(v1, v2)).toBe(!ObjectManager.equal(v1, v2));
            });

            test('different number', () => {
                const v1 = 100 * 10000000;
                const v2 = 100 * 10000000 + 1;

                expect(ObjectManager.equal(v1, v2)).toBe(false);
                expect(ObjectManager.notEqual(v1, v2)).toBe(!ObjectManager.equal(v1, v2));
            });

            test('null', () => {
                const v1 = null;
                const v2 = null;

                expect(ObjectManager.equal(v1, v2)).toBe(true);
                expect(ObjectManager.notEqual(v1, v2)).toBe(!ObjectManager.equal(v1, v2));
            });
        });

        describe('Mixed', () => {
            test('Object vs Array', () => {
                const v1List = [1, 2, 3];
                const v2 = { a: 1, b: 2, c: 3 };

                expect(ObjectManager.equal(v1List, v2)).toBe(false);
                expect(ObjectManager.notEqual(v1List, v2)).toBe(!ObjectManager.equal(v1List, v2));
            });
        });
    });
});

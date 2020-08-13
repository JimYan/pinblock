import {pinblock, arr2hex} from '../src/index';

describe('main', () => {
    test('pinblock is null', () => {
        // pin只能是4-12位的纯数字
        const res = pinblock('111');
        expect(res).toBe(null);

        const res2 = pinblock('11113333444455556666');
        expect(res2).toBe(null);

        const res3 = pinblock('a11d');
        expect(res3).toBe(null);
    });
    test('pinblock length=8', () => {
        const res = pinblock('123456', '123456789012345678');
        if (res) {
            const t = arr2hex(res);
            expect(t.join(' ')).toBe('0x06 0x12 0x53 0xDF 0xFE 0xDC 0xBA 0x98');
        } else {
            expect(0).toBe(1);
        }

        const res2 = pinblock('123456', '1234567890123456');
        if (res2) {
            const t = arr2hex(res2);
            expect(t.join(' ')).toBe('0x06 0x12 0x71 0x31 0x76 0xFE 0xDC 0xBA');
        } else {
            expect(0).toBe(2);
        }

        const res3 = pinblock('1234', '4000001234562000');
        if (res3) {
            const t = arr2hex(res3);
            expect(t.join(' ')).toBe('0x04 0x12 0x34 0xFE 0xDC 0xBA 0x9D 0xFF');
        } else {
            expect(0).toBe(3);
        }

        const res4 = pinblock('92389', '4000001234562'); // 0000400000123456
        if (res4) {
            const t = arr2hex(res4);
            expect(t.join(' ')).toBe('0x05 0x92 0x78 0x9F 0xFF 0xED 0xCB 0xA9');
        } else {
            expect(0).toBe(4);
        }

        const res5 = pinblock('123456');
        if (res5) {
            const t = arr2hex(res5);
            expect(t.join(' ')).toBe('0x06 0x12 0x34 0x56 0xFF 0xFF 0xFF 0xFF');
        } else {
            expect(0).toBe(4);
        }
    });

    test('pinblock length=16', () => {
        const res2 = pinblock('123456', '', 16);
        if (res2) {
            const t = arr2hex(res2);
            expect(t.join(' ')).toBe('0x06 0x12 0x34 0x56 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF');
        } else {
            expect(0).toBe(1);
        }

        const res3 = pinblock('123456', '123456789012345678', 16);
        if (res3) {
            const t = arr2hex(res3);
            expect(t.join(' ')).toBe('0x06 0x12 0x34 0x56 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF 0x98 0x76 0xFE 0xDC 0xBA 0x98');
        } else {
            expect(0).toBe(1);
        }

        const res4 = pinblock('123456', '1234567890123456', 16);
        if (res4) {
            const t = arr2hex(res4);
            expect(t.join(' ')).toBe('0x06 0x12 0x34 0x56 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF 0xBA 0x98 0x76 0xFE 0xDC 0xBA');
        } else {
            expect(0).toBe(1);
        }
    });
});

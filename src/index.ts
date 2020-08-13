/**
 * pinblock长度8对应的是算法是DES/3DES 算法，长度16对应的算法是：SM4 算法
 * @param pin pin值
 * @param pan pan 在银行一般是用户的卡号
 * @param pbl pinblock的长度，是8还是16位，默认8位。
 */
export const pinblock = (pin: string, pan: string = '', pbl: 8 | 16 = 8) => {
    // pin是4到12位的纯数字
    if (pin.length < 4 || pin.length > 12) {
        return null;
    }
    if (!/^\d+$/.test(pin)) {
        return null;
    }

    // pin的编码格式为：
    // pin的字节长度为8个字节
    // 第一个字节是pin的长度
    // 后面每个字节是每2个pin码填1个字节，每个pin占4位
    // 没有填满的用0xff补充
    // 比如pin码是123456，对应的pin码内存为：0x06 0x12 0x34 0x56 0xFF 0xFF 0xFF 0xFF
    const pinBuffer = new ArrayBuffer(pbl);
    const pinAfterProcess = new Uint8Array(pinBuffer);
    pinAfterProcess[0] = pin.length; // 第一个字节为pin的长度
    let offiset = 0;

    // 如果pin的长度不够，那么每一位都补齐F
    if (pin.length < pbl * 2 - 2) {
        pin += String('F').repeat(pbl * 2 - 2 - pin.length);
    }

    for (let i = 0; i < pin.length; i = i + 2) {
        offiset = i / 2 + 1;
        pinAfterProcess[offiset] = ((parseInt(pin[i], 16) & 0x0f) << 4) | (parseInt(pin[i + 1], 16) & 0x0f); // 如果是基数的长度，那么后面4个位都是1，相当于数字15
    }

    // 如果没有pan，那么直接返回pin的结果。
    if (pan === '') {
        return pinAfterProcess;
    }

    let panStr = `0000${pan.substr(pan.length - 12 - 1, 12)}`; // 从最右边的13位开始，获取12个字符，因为不能包括最右边的校验位。
    //   如果panStr没有16位，那么在最左边用0补齐。
    if (panStr.length < pbl * 2) {
        panStr = String('0').repeat(pbl * 2 - panStr.length) + panStr;
    }

    // pan的buffer的长度为8,panStr的长度为16，每2个字符写入到一个字节，每个字符分别占前后四位。
    const panBuffer = new ArrayBuffer(pbl);
    const panAfterProcess = new Uint8Array(panBuffer);
    for (let i = 0; i < panStr.length; i = i + 2) {
        panAfterProcess[i / 2] = ((parseInt(panStr[i], 10) & 0x0f) << 4) | (parseInt(panStr[i + 1], 10) & 0x0f);
    }

    const pinBlockBuffer = new ArrayBuffer(pbl);
    const pinBlock = new Uint8Array(pinBlockBuffer);
    for (let i = 0; i < pbl; ++i) {
        pinBlock[i] = pinAfterProcess[i] ^ panAfterProcess[i]; // pinblock的长度为8，每个字节是pin和pan的异或结果。
    }
    return pinBlock;
};

function decimalToHex(d: number, padding = 2) {
    var hex = Number(d).toString(16).toUpperCase();
    padding = typeof padding === 'undefined' || padding === null ? (padding = 2) : padding;
    while (hex.length < padding) {
        hex = '0' + hex;
    }
    return '0x' + hex;
}

export function arr2hex(arr: Uint8Array): Array<string> {
    const t: Array<string> = [];

    arr.forEach((item: number) => {
        t.push(decimalToHex(item));
    });
    return t;
}
export default pinblock;

# pinblock 算法 NodeJS 实现

pinblock 的 NodeJS 实现，支持 `DES/3DES 算法`和 `SM4 算法`。

注意事项：

1. pin 的长度是 4-12 位的纯数字
2. DES/3DES 算法和 SM4 算法的算法区别在于前者返回的 pin 是 8 个字节，后者返回 16 个字节，按需入参。

使用方法：

## DES/3DES 算法

```ts
import {pinblock} from 'ts-pinblock';

const pin = '123456'; // pin的长度是4-12位。

//——ANSI X9.8 格式（不带主账号信息）
const pb = pinblock(pin);

//——ANSIX9.8 格式（带主账号信息）
const pan = '123456789012345678';
const pb = pinblock(pin, pan);
```

## SM4 算法

```ts
import {pinblock} from 'ts-pinblock';

const pin = '123456'; // pin的长度是4-12位。

//——ANSI X9.8 格式（不带主账号信息）
const pb = pinblock(pin, '', 16);

//——ANSIX9.8 格式（带主账号信息）
const pan = '123456789012345678';
const res = pinblock(pin, pan, 16);
```

## API

### pinblock

获取 pinblock。

入参：

-   pin 必填项目，pin 码，支持 4-12 位纯数字字符串
-   pan 非必填，一般是用户的卡号，默认值为空字符串
-   pbl 非必填，入参是 8 或者 16 的纯数字，默认值 8

返回：
如果出错，返回值为 null。
正常返回 Uint8Array(8)或者 Uint8Array(16)

### arr2hex

把 Uint8Array 类型的数据转换为 16 进制的字符串数组.

```typescript
import {pinblock, arr2hex} from 'ts-pinblock';
const pin = '123456';

const pb = pinblock(pin);
console.log(arr2hex(pb).join(' ')); // 0x06 0x12 0x34 0x56 0xFF 0xFF 0xFF 0xFF
```

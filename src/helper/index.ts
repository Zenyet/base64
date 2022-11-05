export class Helper {
    static B64_TABLE: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];

    encodeText: string;
    decodeText: string;

    constructor(encodeText: string, decodeText: string) {
        this.encodeText = encodeText;
        this.decodeText = decodeText;
    }

    /**
     * 使用浏览器 API 版本
     * @param decode
     */
    encode(decode: string): Helper {
        try {
            this.encodeText = window.btoa(unescape(encodeURIComponent(decode)));
            return this;
        } catch (err) {
            console.log(err.message);
        }
    }

    decode(encode: string): Helper {
        try {
            this.decodeText = decodeURIComponent(escape(window.atob(encode)));
            return this;
        } catch (err) {
            console.log(err.message);
        }
    }

    encodePlus(text: string): string {
        // 整体原则是 3字节 => 4字节 理论多 1/3 体积
        // 1. 先转成 utf-8 码, textEncoder 只支持 utf-8 编码
        const utf8Codes: Uint8Array = new TextEncoder().encode(text); // 得到的 utf-8 码
        // 2. 遍历转换成二进制字符串
        let binaries: string = '';
        let ret: string = '';
        utf8Codes.forEach(e => {
            let len: number = e.toString(2).length;
            binaries += ("00000000" + e.toString(2)).substring(len); // 前面补零
        });
        // 3. 转换成数组
        const binArr: string[] = Array.from(binaries);
        // 遍历得每 6bit 得十进制，得到 base64 表得 index
        for (let i: number = binaries.length; i > 4; i -= 6) {
            let index: number = parseInt(binArr.splice(0, 6).join(''), 2); // 6位二进制转换为十进制的 base64 index
            ret += Helper.B64_TABLE[index]; // 查询 base64 表
        }
        let lastIndex: number = 0;
        if (binArr.length !== 0) {
            lastIndex = parseInt((binArr.join('') + '000000').substring(0, 6), 2); // 后面补零
            if (binArr.length === 2) {
                return ret + Helper.B64_TABLE[lastIndex] + '==';
            } else if (binArr.length === 4) {
                return ret + Helper.B64_TABLE[lastIndex] + '=';
            }
        }
        return ret;
    }

    decodePlus(text: string): string {
        // 解码 base64
        // 1. base64 => 二进制
        //    根据 base64 表获取 index
        const bsArr: string[] = Array.from(String(text));
        let binStr: string = '';
        let utfArr: number[] = [];
        let ret: string;
        bsArr.forEach(e => {
            if (e !== '=') {
                let bin: string = Number(Helper.B64_TABLE.indexOf(e)).toString(2); // index => binary
                let bins: string = ('000000' + bin).substring(bin.length); // 补 0 始终以 6bit 表示
                binStr += bins;
            }
        })
        let count: number = (binStr.length / 8) >> 0;
        // console.log(count);
        for (let i: number = 0; i < count; i++) {
            let utfCode: number = parseInt(binStr.substring(i * 8, (i + 1) * 8), 2);
            utfArr.push(utfCode);
        }

        // console.log(binStr);
        // console.log(utfArr);

        const uint8Array: Uint8Array = new Uint8Array(utfArr);
        ret = new TextDecoder().decode(uint8Array);
        return ret;
    }
}
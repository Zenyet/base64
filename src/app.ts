import {Helper} from "./helper";

import './assets/style.css';



const helper: Helper = new Helper('default', 'default');

document.querySelector<HTMLDivElement>('#app').innerHTML = `
<div id="container">
        <div id="encode-area">
            <textarea autofocus id="encode-input" placeholder="要编码🔐的字符串"></textarea>
            <button type="button" id="encode-copy-btn">
                <svg id="encode-svg" x="1667574644478" viewBox="0 0 1024 1024" 
                     xmlns="http://www.w3.org/2000/svg" p-id="3035" width="200" height="200">
                    <path d="M969.110206 219.486037q22.818942 0 38.836083 16.017142t16.017142 38.836083l0 694.807514q0 22.818942-16.017142 38.836083t-38.836083 16.017142l-548.532248 0q-22.818942 0-38.836083-16.017142t-16.017142-38.836083l0-164.559674-310.83494 0q-22.818942 0-38.836083-16.017142t-16.017142-38.836083l0-383.972573q0-22.818942 11.409471-50.318692t27.426612-43.443754l233.162774-233.162774q16.017142-16.017142 43.443754-27.426612t50.318692-11.409471l237.697307 0q22.818942 0 38.836083 16.017142t16.017142 38.836083l0 187.451753q38.836083-22.818942 73.137633-22.818942l237.697307 0zM658.275266 341.187058l-170.849511 170.849511 170.849511 0 0-170.849511zM292.587101 121.774159l-170.849511 170.849511 170.849511 0 0-170.849511zM404.560817 491.484894l180.576816-180.576816 0-237.697307-219.412899 0 0 237.697307q0 22.818942-16.017142 38.836083t-38.836083 16.017142l-237.697307 0 0 365.688165 292.550532 0 0-146.275266q0-22.818942 11.409471-50.318692t27.426612-43.443754zM950.825798 950.862367l0-658.238697-219.412899 0 0 237.697307q0 22.818942-16.017142 38.836083t-38.836083 16.017142l-237.697307 0 0 365.688165 511.963431 0z"
                          p-id="3036"></path>
                </svg>
                <span id="encode-span">复制</span>
            </button>
        </div>
    <div id="decode-area">
        <textarea id="decode-input" placeholder="要解码的字符串"></textarea>
        <button type="button" id="decode-copy-btn">
            <svg id="decode-svg" t="1667574644478" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg" p-id="3035" width="200" height="200">
                <path d="M969.110206 219.486037q22.818942 0 38.836083 16.017142t16.017142 38.836083l0 694.807514q0 22.818942-16.017142 38.836083t-38.836083 16.017142l-548.532248 0q-22.818942 0-38.836083-16.017142t-16.017142-38.836083l0-164.559674-310.83494 0q-22.818942 0-38.836083-16.017142t-16.017142-38.836083l0-383.972573q0-22.818942 11.409471-50.318692t27.426612-43.443754l233.162774-233.162774q16.017142-16.017142 43.443754-27.426612t50.318692-11.409471l237.697307 0q22.818942 0 38.836083 16.017142t16.017142 38.836083l0 187.451753q38.836083-22.818942 73.137633-22.818942l237.697307 0zM658.275266 341.187058l-170.849511 170.849511 170.849511 0 0-170.849511zM292.587101 121.774159l-170.849511 170.849511 170.849511 0 0-170.849511zM404.560817 491.484894l180.576816-180.576816 0-237.697307-219.412899 0 0 237.697307q0 22.818942-16.017142 38.836083t-38.836083 16.017142l-237.697307 0 0 365.688165 292.550532 0 0-146.275266q0-22.818942 11.409471-50.318692t27.426612-43.443754zM950.825798 950.862367l0-658.238697-219.412899 0 0 237.697307q0 22.818942-16.017142 38.836083t-38.836083 16.017142l-237.697307 0 0 365.688165 511.963431 0z"
                      p-id="3036"></path>
            </svg>
            <span id="decode-span">复制</span>
        </button>
    </div>
</div>

<footer id="footer">
    <span>Made By <a href="https://yequalsx.com" id="link_">______</a></span>
</footer>
`;

// 获取相应的 DOM 对象
const eiDom: HTMLInputElement = <HTMLInputElement>document.getElementById('encode-input');
const diDom: HTMLInputElement = <HTMLInputElement>document.getElementById('decode-input');
const encode_btn: HTMLElement = document.getElementById('encode-copy-btn');
const decode_btn: HTMLElement = document.getElementById('decode-copy-btn');
const encode_span: HTMLSpanElement = document.getElementById('encode-span');
const decode_span: HTMLSpanElement = document.getElementById('decode-span');

// 添加事件逻辑

eiDom.addEventListener('input', () => {
    // diDom.value = helper.encode(eiDom.value)?.encodeText;
    diDom.value = helper.encodePlus(eiDom.value);
});

diDom.addEventListener('input', () => {
    // eiDom.value = helper.decode(diDom.value)?.decodeText || 'base64码格式不对';
    eiDom.value = helper.decodePlus(diDom.value);
    if (!diDom.value) eiDom.value = '';
});

encode_btn.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText(eiDom.value).then(() => {
        encode_span.innerText = '已复制！';
        setTimeout(() => {
            encode_span.innerText = '复制';
        }, 1500);
    }).catch(err => {
        console.log('复制失败！', err.message);
    })
})

decode_btn.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText(diDom.value).then(() => {
        decode_span.innerText = '已复制！';
        setTimeout(() => {
            decode_span.innerText = '复制';
        }, 1500);
    }).catch(err => {
        console.log('复制失败！', err.message);
    })
})


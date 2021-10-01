import React from "react";
import ReactDOMserver from 'react-dom/server';
import {configureToMatchImageSnapshot} from 'jest-image-snapshot';
import Button from "..";

const toMatchSnapshot = configureToMatchImageSnapshot({
    customSnapshotsDir: `${process.cwd()}/snapshots`,
    customDiffDir: `${process.cwd()}/diffSnapshots`,
});
// 扩展espect的功能
expect.extend({ toMatchSnapshot });
describe('测试Button快照', () => {
    it('测试快照是否正确', async () => {
        await jestPuppeteer.resetPage();
        await page.goto(`file://${process.cwd()}/tests/index.html`);
        const html = ReactDOMserver.renderToString(<Button>按钮</Button>);
        await page.evaluate(innerHTML => {
            document.querySelector('#root').innerHTML = innerHTML;
        }, html)
        const screenShot = await page.screenshot(); // 生成一张新的快照
        expect(screenShot).toMatchSnapshot() // 比较 新的快照和老的快照是否相同
    })
})
// react单元测试可以用enzyme 最新用的是
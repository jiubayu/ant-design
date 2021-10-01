import React from 'react';
import { mount, render } from 'enzyme';
import Button from '..';
describe('测试Button', () => {
    it('测试Button是否能够正确挂载', () => {
        // 挂载组件的过程不抛错误
        expect(() => mount(<Button>Follow</Button>)).not.toThrow();
    })
})
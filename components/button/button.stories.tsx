import React from "react";
import  {ComponentStory, ComponentMeta} from '@storybook/react';
import Button from '.';
// 元数据 Button描述信息
export default {
    title: '通用/Button',
    component: Button
} as ComponentMeta<typeof Button>
// 定义一个组件故事模版
const Template: ComponentStory<typeof Button> = (args) => <Button {...args}/>;
// 基本组件
export const basic = Template.bind({});
// 定义组件属性
basic.args = {
    children: '按钮'
}
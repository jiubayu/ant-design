import React, {ButtonHTMLAttributes} from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{

}
// FC 即函数组件
const Button:React.FC<ButtonProps> = (props) => {
    const {children} = props;
    return <button type="button">{children}</button>
}
export default Button;
// 如果导出的是type，会保证在编译时去掉，进行进行性能优化
export type {ButtonProps};
import React from "react";
import { render, screen } from '@testing-library/react';
import Component from "./Component";

test('默认属性',()=>{
    render(<Component />);       //渲染组件

    const p=screen.getByText('多选标题');
    expect(p).toBeInTheDocument();

    for(let i=1;i<=3;i++){
        const label=screen.getByText(`选项${i}`);
        expect(label).toBeInTheDocument();

        const checkbox=screen.getByDisplayValue(`item${i}`);       //value 在 input 的 value 属性，非可见文本
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();       //每一个 checkbox 都默认未选中
    }
});

test('传入属性',()=>{
    const list=[
        {value:'v1',text:'t1',checked:false},
        {value:'v2',text:'t2',checked:true},
        {value:'v3',text:'t3',checked:false},
    ];
    render(<Component list={list} title="hello" />);

    const p=screen.getByText('hello');
    expect(p).toBeInTheDocument();

    const checkbox1=screen.getByDisplayValue('v1');
    expect(checkbox1).toBeInTheDocument();
    expect(checkbox1.getAttribute('checked')).toBeNull();     //未选中

    const checkbox2=screen.getByDisplayValue('v2');
    expect(checkbox2).toBeInTheDocument();
    expect(checkbox2.getAttribute('checked')).not.toBeNull();      //选中

    const checkbox3=screen.getByDisplayValue('v3');
    expect(checkbox3).toBeInTheDocument();
    expect(checkbox3.getAttribute('checked')).toBeNull();      //未选中
});
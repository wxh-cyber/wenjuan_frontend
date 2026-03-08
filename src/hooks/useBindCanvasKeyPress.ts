import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
    removeSelectedComponent,
    copySelectedComponent,
    pasteCopiedComponent,
    selectPrevComponent,
    selectNextComponent
} from "../store/componentsReducer";

//判断当前光标所处位置是否合法
function isActiveElementValid() {
    const activeElem = document.activeElement;

    if (activeElem === document.body) return true;      //光标没有focus到侧边栏的任何元素
    return false;
}

function useBindCanvasKeyPress() {
    const dispatch = useDispatch();

    //删除组件
    useKeyPress(['backspace', 'delete'], () => {
        if (!isActiveElementValid()) return;       //如果当前光标所处位置不合法，则不执行删除
        dispatch(removeSelectedComponent());
    });

    //复制
    useKeyPress(['ctrl.c', 'meta.c'], () => {
        if (!isActiveElementValid()) return;       //如果当前光标所处位置不合法，则不执行复制
        dispatch(copySelectedComponent());
    });

    //粘贴
    useKeyPress(['ctrl.v', 'meta.v'], () => {
        if (!isActiveElementValid()) return;       //如果当前光标所处位置不合法，则不执行粘贴
        dispatch(pasteCopiedComponent());
    });

    //选中上一个
    useKeyPress('uparrow', () => {
        if (!isActiveElementValid()) return;       //如果当前光标所处位置不合法，则不执行选中上一个
        dispatch(selectPrevComponent());
    });

    //选中下一个
    useKeyPress('downarrow', () => {
        if (!isActiveElementValid()) return;       //如果当前光标所处位置不合法，则不执行选中下一个
        dispatch(selectNextComponent());
    });
}

export default useBindCanvasKeyPress;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PageInfoType = {
    title: string;
    desc?:string;
    js?:string;
    css?:string;
}

const INIT_STATE: PageInfoType = {
    title: '',
    desc:'',
    js:'',
    css:''
}

const pageInfoSlice = createSlice({
    name: 'pageInfo',
    initialState: INIT_STATE,
    reducers: {
        //重置页面信息
        resetPageInfo:(state:PageInfoType, action: PayloadAction<PageInfoType>) => {
            return action.payload;
        },

        //修改标题
        changePageTitle:(draft:PageInfoType, action: PayloadAction<string>) => {
            draft.title = action.payload;
        }
    },
});

export const {resetPageInfo,changePageTitle} = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
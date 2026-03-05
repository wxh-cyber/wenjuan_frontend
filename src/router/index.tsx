import React from 'react'
import {createBrowserRouter} from 'react-router-dom'

import ManageLayout from '../layouts/ManageLayout'
import MainLayout from '../layouts/MainLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import MyList from '../pages/manage/List'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'
import Edit from '../pages/question/Edit'
import Stat from '../pages/question/Stat'

const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout />,
        children:[
            {
                path:'/',
                element:<Home />
            },
            {
                path:'login',
                element:<Login />
            },
            {
                path:'register',
                element:<Register />
            },
            {
                path:'manage',
                element:<ManageLayout />,
                children:[
                    {
                        path:'list',
                        element:<MyList />
                    },
                    {
                        path:'star',
                        element:<Star />
                    },
                    {
                        path:'trash',
                        element:<Trash />
                    }
                ]
            },
            {
                path:'*',      //404路由配置，都写在最后（兜底）
                element:<NotFound />
            }
        ]
    },
    {
                path:'question',
                element:<QuestionLayout />,
                children:[
                    {
                        path:'edit/:id',
                        element:<Edit />
                    },
                    {
                        path:'stat/:id',
                        element:<Stat />
                    }
                ]
            },
]);

export default router;

// ----------------分割线-----------------

//常用的路由常量
export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_INDEX_PATHNAME = '/manage/list';

export function isLoginOrRegister(pathname:string){
    if([LOGIN_PATHNAME,REGISTER_PATHNAME].includes(pathname)) return true;
    return false;
}

export function isNoNeedUserInfo(pathname:string){
    if([HOME_PATHNAME,LOGIN_PATHNAME,REGISTER_PATHNAME].includes(pathname)) return true;
    return false;
}
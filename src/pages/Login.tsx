import { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { REGISTER_PATHNAME ,MANAGE_INDEX_PATHNAME} from '../router';
import styles from './Login.module.scss'
import { loginService,getUserInfoService } from '../services/user';
import { loginReducer,UserStateType } from '../store/userReducer';
import { setToken } from '../utils/user-token';
import { useRequest } from 'ahooks';
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons'

const { Title } = Typography;

const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

function rememberUser(username: string, password: string) {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFromStorage() {
    return {
        username: localStorage.getItem(USERNAME_KEY) ?? "",
        password: localStorage.getItem(PASSWORD_KEY) ?? ""
    }
}

const Login: FC = () => {
    const nav = useNavigate();
    const dispatch=useDispatch();

    const [form] = Form.useForm();

    useEffect(() => {
        const { username, password } = getUserInfoFromStorage();
        form.setFieldsValue({
            username,
            password
        });
    }, []);

    const {run}=useRequest(async (username:string,password:string)=>{
        const data=await loginService(username,password);      //向后端发送登录请求，返回一个token
        return data;
    },{
        manual:true,
        onSuccess:async (result)=>{
             const {token=''}=result;
             setToken(token);                //存储token
             //不同于注册，登录时需要将用户信息存储到redux的store中
             const userInfo=await getUserInfoService();       //在登录后向后端发送带消息头的请求，返回用户信息
             dispatch(loginReducer(userInfo as UserStateType));     //将用户信息存储到redux的store中
             
             message.success("登录成功");
             nav(MANAGE_INDEX_PATHNAME);     //导航到“我的问卷”
        }
    });

    const onFinish = (values: any) => {
        //console.log('onFinish', values);

        const { username, password, remember } = values || {};
        run(username,password);     //执行ajax

        if (remember) {
            rememberUser(username, password);
        } else {
            deleteUserFromStorage();
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}><UserAddOutlined /></Title>
                    <Title level={2}>登录</Title>
                </Space>
            </div>
            <div>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    initialValues={{
                        remember: true
                    }}
                    form={form}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            { required: true, message: '请输入用户名' },
                            { type: 'string', min: 3, max: 20, message: '用户名长度必须在3到20位之间' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码' }
                        ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName='checked' wrapperCol={{ offset: 6, span: 16 }}>
                        {/* 采用checked属性代替value属性 */}
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">登录</Button>
                            <Link to={REGISTER_PATHNAME}>注册新用户</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;

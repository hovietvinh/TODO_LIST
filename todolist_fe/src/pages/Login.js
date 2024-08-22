import { Button, Form, Input, notification,Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { loginApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import { register } from '../redux/actions/UserAction';
function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const login = async(e)=>{
    
      const res = await loginApi(e);
      if(res.code ===200){
        Cookies.set('token', res.token, { expires: 7 });
        navigate("/projects")

      }
      else{
        notification.error({
          message:"Đăng nhập không thành công",
          description:res.message,
          duration: 2,
        })
      }
      
  }
  const registerForm = (e)=>{
     
      
      dispatch(register(e))
      formModal.resetFields();
      
      setModal2Open(false)
      
  }
  const [modal2Open, setModal2Open] = useState(false);
    return (
        <>
          <div className="outline-none m-0 p-0 w-auto min-h-[640px] bg-[#F1F4F7]">
            <div className="pt-[72px] pb-[112px] min-w-[500px]">
              <div className="px-0 py-[20px] m-0 m-auto w-[980px] relative">
                <div className="box-border mr-0 pr-[32px] w-[580px] inline-block align-top">
                  <div className="pt-[112px] pb-[16px]">
                    <span className="text-6xl text-blue-600 h-[106px] m-[-8px] font-bold" >Todolist</span>
                  </div>
                  <h2 className="w-[500px] inline-block leading-[32px] font-normal text-[28px] pb-[20px]">Todolist giúp bạn dễ dàng quản lý công việc với mọi người trong cuộc sống bạn.</h2>
                </div>

                <div className="inline-block align-top">
                  <div className="h-[456px] w-[396px]">
                    <div className="pb-[10px] pt-[10px] text-center bg-[#fff] border-none rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1),_0_8px_16px_rgba(0,0,0,0.1)] mt-[40px] pt-[20px] pb-[28px] px-0 w-[396px] ">
                      <Form className='m-0 p-o text-center' onFinish={login} form={form}>
                        <Form.Item
                         name="email"
                         className='text-[17px] w-[364px] inline-block m-auto py-[6px]'
                         rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                        ]}
                         >
                           <Input  size="large" prefix={<UserOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                         name="password"
                         className='text-[17px] w-[364px] inline-block m-auto py-[6px]'
                         rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                        ]}
                         >
                           <Input  size="large" prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" />
                        </Form.Item>
                        <Form.Item className='text-[17px] w-[364px] inline-block m-auto py-[6px]'>
                          <Button size="large" block type="primary" htmlType="submit">
                            Đăng nhập
                          </Button>
                        </Form.Item>

                        <div className='mt-[16px]'>
                          <a href="#" className='text-[14px] font-bold text-blue-500 cursor-pointer' >Quên mật khẩu? </a>
                        </div>
                        <div className='items-center border-b-[1px] border-[#dadde1] flex my-[20px] mx-[16px] text-center'></div>

                        <Form.Item>
                          <Button onClick={() => setModal2Open(true)} size="large" className="bg-[#42b72a]  hover:!bg-[#3f972b]" type="primary" >
                            Tạo tài khoản mới
                          </Button>

                        </Form.Item>
                      </Form>
                    </div>
                    <div className="border-t-0 text-[14px] font-normal pt-0 mt-[24px] text-center	">
                      Ứng dụng dành cho người cá nhân, thương hiệu hoặc doanh nghiệp.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal className='bg-transparent overflow-visible p-0 w-[432px]' footer={null} onCancel={() => setModal2Open(false)} open={modal2Open} centered>
            <div className='bg-white mt-0 pb-[10px] pr-[16px] relative w-[432px] rounded-lg box-border'>
              <div className='text-[#1c1e21] text-[26px] leading-[38px] mb-0 font-semibold'>Đăng ký</div>
              <div className='mb-0 text-[#606770] leading-[24px] text-[14px]'>Nhanh chóng và dễ dàng</div>
            </div>

            <div className='pb-0 mt-0 mr-auto mb-0 ml-auto'>
                <div className='bg-white rounded-b-lg rounded-t-none border-t border-t-[#dadde1] box-border p-[16px] relative w-[432px]'>
                  <Form onFinish={registerForm} className='m-0 p-0' form={formModal} >
                  <Form.Item
                      name="fullName"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your fullname!',
                        },
                      ]}
                      >
                      <Input prefix={<UserOutlined />} placeholder="FullName" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your email!',
                        },
                      ]}
                      >
                      <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Password!',
                        },
                      ]}
                    >
                      <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item className='flex justify-center'> 
                      <Button type="primary" htmlType="submit" size="large" className='px-[40px] text-white bg-[#00a400] text-[14px]' block>Đăng ký</Button>
                    </Form.Item>
                  </Form>
                </div>
            </div>
          </Modal>
        </>
          
    );
}

export default Login;
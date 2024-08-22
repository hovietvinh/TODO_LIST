import{ useState } from 'react';
import {Card, Form,Input, Select,Button} from 'antd';
import TinyMCE from '../components/TinyMCE';
import { Calendar, theme } from 'antd';
import {useDispatch, useSelector} from "react-redux"
import { createTask } from '../redux/actions/TaskAction';
const { Option } = Select;
function CreateProject() {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    let tasks = useSelector(state => state.TaskReducer)
   

    const options = [
        { value: "initial", label: "Khởi tạo" },
        { value: "doing", label: "Đang làm" },
        { value: "finish", label: "Hoàn thành" },
        { value: "notfinish", label: "Không hoàn thành" }
    ];
    const onPanelChange1 = (value, mode) => {
        form.setFieldsValue({ timeStart: value });
    };
    const onPanelChange2 = (value, mode) => {
        form.setFieldsValue({ timeFinish:  value });
    };
    const createTaskForm= (e)=>{
        dispatch(createTask(e))
        form.resetFields();
    }
    const [content, setContent] = useState('');
    const handleContentChange = (value) => {
        setContent(value);
        form.setFieldsValue({ content: value });
    };
    return (
        <>
            <div className='h-full w-full'>
                <div className='pt-5 px-10'>
                    <h1 className='text-[28px] mb-4'>Thêm mới công việc</h1>
                    <div className='pt-10 max-h-[700px] overflow-scroll'>
                        <Card className='' title={
                            <div className=' py-4 px-6 bg-[#F4F5F7] text-[16px] font-normal'>Bảng thêm mới</div>
                        }>

                            <Form onFinish={createTaskForm} layout="horizontal" labelCol={{ span: 3 }} wrapperCol={{ span: 18 }} form={form} >
                                <Form.Item  name="title" label="Tiêu đề" rules={[
          {
            required: true,
            message: 'Không được để trống',
          },
        ]}>
                                    <Input placeholder="" />
                                </Form.Item>
                                
                                    
                                <Form.Item  name="status" label="Trạng thái" >
                                    <Select 
                                        optionFilterProp="children" 
                                        showSearch 
                                        filterOption={(input, option) => 
                                            option.children.toLowerCase().includes(input.toLowerCase())
                                        }   
                                    >
                                        {options.map(option => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                
                               
                                
                                <Form.Item name="content" label="Nội dung" >
                                    <TinyMCE value={content} onChange={handleContentChange}/>
                                </Form.Item>

                                <div className="ml-5 flex justify-between space-x-6">
                                    <Form.Item labelCol={6} name="startTime"  label="Thời gian bắt đầu" className="w-full md:w-1/2">
                                        <Calendar fullscreen={false} onPanelChange={onPanelChange1} />
                                    </Form.Item>
                                    <Form.Item labelCol={6}  name="endTime" label="Thời gian kết thúc" className="w-full md:w-1/2 mt-4 md:mt-0">
                                        <Calendar fullscreen={false} onPanelChange={onPanelChange2} />
                                    </Form.Item>
                                </div>

                                <Form.Item className="flex justify-end mt-4 mr-4">
                                    <Button  size="large" type="primary" htmlType="submit">
                                        Tạo mới
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default CreateProject;
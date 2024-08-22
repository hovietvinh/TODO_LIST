import { useEffect, useState } from 'react';
import { Card, Form, Input, Select, Button } from 'antd';
import TinyMCE from '../components/TinyMCE';
import { Calendar } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { createTask, editTask, getTaskDetail } from '../redux/actions/TaskAction';
import { useParams } from 'react-router-dom';

const { Option } = Select;

function EditProject() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    let tasks = useSelector(state => state.TaskReducer);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getTaskDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (tasks && tasks.length > 0) {  
            form.setFieldsValue({
                title: tasks[0].title || "",
                status: tasks[0].status || "",
                content: tasks[0].content || "",
                startTime: tasks[0].startTime || null,
                endTime: tasks[0].endTime || null,
            });
            setContent(tasks[0].content || "");
        }
    }, [tasks, form]);
    

    const options = [
        { value: "initial", label: "Khởi tạo" },
        { value: "doing", label: "Đang làm" },
        { value: "finish", label: "Hoàn thành" },
        { value: "notfinish", label: "Không hoàn thành" }
    ];

    const onPanelChange1 = (value, mode) => {
        form.setFieldsValue({ startTime: value });
    };

    const onPanelChange2 = (value, mode) => {
        form.setFieldsValue({ endTime: value });
    };

    const editTaskForm = async (e) => {
        await dispatch(editTask(id, e));
        
        // Scroll to the top of the element with class 'abc'
        const element = document.querySelector('.scrool');
        if (element) {
            element.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const [content, setContent] = useState('');

    const handleContentChange = (value) => {
        setContent(value);
        form.setFieldsValue({ content: value });
    };

    return (
        <>
            {tasks.length>0 &&(
                <div className='h-full w-full'>
                    <div className='pt-5 px-10'>
                        <h1 className='text-[28px] mb-4'>Chỉnh sửa công việc</h1>
                        <div className='scrool pt-10 max-h-[700px] overflow-scroll'>
                            <Card title={<div className='py-4 px-6 bg-[#F4F5F7] text-[16px] font-normal'>Bảng chỉnh sửa</div>}>
                                <Form onFinish={editTaskForm} layout="horizontal" labelCol={{ span: 3 }} wrapperCol={{ span: 18 }} form={form}>
                                    <Form.Item
                                        name="title"
                                        label="Tiêu đề"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Không được để trống',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="" />
                                    </Form.Item>

                                    <Form.Item name="status" label="Trạng thái">
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

                                    <Form.Item name="content" label="Nội dung">
                                        <TinyMCE value={content} onChange={handleContentChange} />
                                    </Form.Item>

                                    <div className="ml-5 flex justify-between space-x-6">
                                        <Form.Item labelCol={6} name="startTime" label="Thời gian bắt đầu" className="w-full md:w-1/2">
                                            <Calendar 
                                                fullscreen={false} 
                                                value={tasks.length > 0 ? tasks[0].startTime : null} 
                                                onPanelChange={onPanelChange1} 
                                            />
                                        </Form.Item>
                                        <Form.Item labelCol={6} name="endTime" label="Thời gian kết thúc" className="w-full md:w-1/2 mt-4 md:mt-0">
                                            <Calendar 
                                                fullscreen={false} 
                                                value={tasks.length > 0 ? tasks[0].endTime : null} 
                                                onPanelChange={onPanelChange2} 
                                            />
                                        </Form.Item>
                                    </div>

                                    <Form.Item className="flex justify-end mt-4 mr-4">
                                        <Button size="large" type="primary" htmlType="submit">
                                            Cập nhật
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
            
        </>
    );
}

export default EditProject;

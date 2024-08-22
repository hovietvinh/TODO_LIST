import { Button, Space, Table, Tag } from 'antd';
import {useDispatch, useSelector} from "react-redux"
import { getTask } from "../../redux/actions/TaskAction";
import moment from 'moment';
import DOMPurify from 'dompurify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function SHowTasks(props) {
  const navigate = useNavigate()
    let tasks = useSelector(state => state.TaskReducer)
    const dispatch = useDispatch();
    const getTaskList = ()=>{
      dispatch(getTask())
    }
    useEffect(()=>{
      getTaskList()
    },[])
    const formatDate = (date) => {
        // Sử dụng moment.js để định dạng ngày theo kiểu dd/mm/yyyy
        return moment(date).format('DD/MM/YYYY');
    };

    const handleEdit = (id)=>{
      navigate(`/projects/edit/${id}`)
      console.log(id);
    }
    const handleDelete = (id)=>{
      console.log(id);
    }
    const statusColors = {
        initial: '#D1D5DB', // Màu xám nhạt
        doing: '#3B82F6',   // Màu xanh dương
        finish: '#10B981',  // Màu xanh lá cây
        notfinish: '#EF4444' // Màu đỏ
    };
    const data = tasks
    const columns = [
      {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
        render: (html) => (
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
        )
      },
      {
        title: 'Bắt đầu',
        dataIndex: 'timeStart',
        key: 'timeStart',
        render: (text) => formatDate(text),
      },
      {
        title: 'Kết thúc',
        dataIndex: 'timeFinish',
        key: 'timeFinish',
        render: (text) => formatDate(text),
      },
      {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: (text) => {
          const statusText = text ? text.toUpperCase() : 'UNKNOWN'; // Kiểm tra giá trị text
          const statusColor = statusColors[text] || '#d9d9d9'; // Đặt màu mặc định nếu không tìm thấy màu
    
          return (
            <Tag color={statusColor}>
              {statusText}
            </Tag>
          );
        },
      },
      {
        title: 'Hoạt động',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button 
              onClick={() => handleEdit(record._id)} 
              className='bg-[#e0ea25] text-black'>
              Sửa
            </Button>
            <Button onClick={() => handleDelete(record._id)} className='bg-[#DC3444] text-white'>Xóa</Button>
          </Space>
        ),
      },
    ];
    return (
        <>
            <Table pagination={false} className="pt-10 px-10 " columns={columns} dataSource={data} />
        
        </>
    );
}

export default SHowTasks;
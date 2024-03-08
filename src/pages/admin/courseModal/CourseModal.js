import React, { useState } from 'react';
import { Modal, Button, DatePicker, message } from 'antd';
import baseUrl from '../../../config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/loaderReducer';
import { Feild } from '../../../common/components';

const CourseModal = ({ isOpen, title, setIsOpen, data, getAllCourses }) => {

    const [batchStartDate, setBatchStartDate] = useState('');
    const [batchEndDate, setBatchEndDate] = useState('');
    const [upcomingBatches, setUpcomingBatches] = useState(data.upcomingBatches);
    const [project, setProject] = useState({
        title   : '',
        description: ''
    });

    const dispatch = useDispatch();

    const handleDateChange = (date, dateString) => {
        console.log(dateString);
        setBatchStartDate(dateString[0]);
        setBatchEndDate(dateString[1]);
        setUpcomingBatches([...upcomingBatches, { batchStartDate: dateString[0], batchEndDate: dateString[1] }]);
    }

    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    const handleBatchAdd = async () => {
        if (batchStartDate === '' || batchEndDate === '') {
            message.warning('Please select the start and end date of the batch');
            return;
        }
        const newVar = {
            upcomingBatches: upcomingBatches
        }
        dispatch(setLoading(true))
        try {
            const response = await axios.put(`${baseUrl}/api/admin/courses/${data._id}`, newVar, { headers });
            console.log(response);
            if (response.data.success) {
                dispatch(setLoading(false));
                message.success('Batch added successfully');
                setBatchEndDate('');
                setBatchStartDate('');
                getAllCourses();
                setIsOpen(false);
            }
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            message.error('Failed to add batch');
        }
    }

    const handleProjectAdd = async () => {
        if (project.title    === '' || project.description === '') {
            message.warning('Please fill all the fields');
            return;
        }
        const newVar = {
            projects: [...data.projects, project]
        }
        dispatch(setLoading(true))
        try {
            const response = await axios.put(`${baseUrl}/api/admin/courses/${data._id}`, newVar, { headers });
            console.log(response);
            if (response.data.success) {
                dispatch(setLoading(false));
                message.success('Project added successfully');
                setProject({
                    title   : '',
                    description: ''
                });
                getAllCourses();
                setIsOpen(false);
            }
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            message.error('Failed to add project');
        }
    }

    return (
        <div>
            <Modal
                title={<p className='text-2xl font-medium'>{`Add ${title}`}</p>}
                open={isOpen}
                onOk={() => title === 'Batch' ? handleBatchAdd() : handleProjectAdd()}
                onCancel={() => setIsOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" className='bg-orange-500 text-white' onClick={() => title === 'Batch' ? handleBatchAdd() : handleProjectAdd()}>
                        Submit
                    </Button>,
                ]}
            >
                {title === 'Batch' &&
                    <div className='flex flex-col w-full'>
                        <div className="flex flex-col">
                            <h1 className='text-[18px] my-2 font-medium'>Choose the start and end date of the batch</h1>
                            <DatePicker.RangePicker onChange={handleDateChange} />
                        </div>
                    </div>
                }
                {title === 'Project' &&
                    <div className='flex flex-col w-full'>
                        <div className="flex flex-col">
                            <h1 className='text-[18px] my-2 font-medium'>Add Project Details</h1>
                            <Feild
                                label='Project Name'
                                placeHolder='Enter the project name'
                                value={project.title    }
                                onChange={(e) => setProject({ ...project, title     : e.target.value })}
                            />
                            <Feild
                                label='Project Description'
                                placeHolder='Enter the project description'
                                value={project.description}
                                onChange={(e) => setProject({ ...project, description: e.target.value })}
                            />
                        </div>
                    </div>
                }
            </Modal>
        </div>
    )
}

export default CourseModal

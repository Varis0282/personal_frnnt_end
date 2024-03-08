import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Collapse, DatePicker, Tooltip, message } from 'antd';
import { Feild } from '../../../common/components';
import CourseModal from '../courseModal/CourseModal';
import axios from 'axios';
import baseUrl from '../../../config';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/loaderReducer';
import { DeleteFilled } from '@ant-design/icons';
const { RangePicker } = DatePicker;


const CourseCollapse = ({ data, getAllCourses }) => {
    const [isOpenBatch, setIsOpenBatch] = useState(false);
    const [isOpenProject, setIsOpenProject] = useState(false);
    const [save, setSave] = useState(false);

    const [courseData, setCourseData] = useState({
        name: data?.name,
        duration: data?.duration,
        price: data?.price,
        actualPrice: data?.actualPrice,
    });

    const dispatch = useDispatch();

    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
        setSave(true);
    }

    const saveHandler = async () => {
        if (courseData.name === '' || courseData.duration === '' || courseData.price === '' || courseData.actualPrice === '') {
            message.warning('Please fill all the fields');
            return;
        }
        dispatch(setLoading(true));
        try {
            const response = await axios.put(`${baseUrl}/api/admin/courses/${data._id}`, courseData, { headers });
            console.log(response);
            if (response.data.success) {
                message.success('Course updated successfully');
                setSave(false);
                getAllCourses();
            }
        } catch (error) {
            message.error('Failed to update course');
            console.log(error);
        }
        dispatch(setLoading(false));
    };

    const handleBatchDelete = async (index) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.put(`${baseUrl}/api/admin/courses/${data._id}`, { upcomingBatches: data.upcomingBatches.filter((_, i) => i !== index) }, { headers });
            console.log(response);
            if (response.data.success) {
                message.success('Batch deleted successfully');
                getAllCourses();
            }
        } catch (error) {
            message.error('Failed to delete batch');
            console.log(error);
        }
        dispatch(setLoading(false));
    }

    const handleProjectDelete = async (index) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.put(`${baseUrl}/api/admin/courses/${data._id}`, { projects: data.projects.filter((_, i) => i !== index) }, { headers });
            console.log(response);
            if (response.data.success) {
                message.success('Project deleted successfully');
                getAllCourses();
            }
        } catch (error) {
            message.error('Failed to delete project');
            console.log(error);
        }
        dispatch(setLoading(false));
    }


    useEffect(() => {
        if (courseData.name !== data?.name || courseData.duration !== data?.duration || courseData.price !== data?.price || courseData.actualPrice !== data?.actualPrice) {
            setSave(true);
        }
        if (courseData.name == data?.name && courseData.duration == data?.duration && courseData.price == data?.price && courseData.actualPrice == data?.actualPrice) {  //eslint-disable-line
            setSave(false);
        }
    }, [courseData, data]);


    return (
        <div className='flex flex-col'>
            <div className="flex sm:flex-row flex-col justify-between">
                <div className="sm:w-[48%] w-full">
                    <Feild label="Course Name"
                        value={courseData?.name}
                        name={'name'}
                        onChange={inputChangeHandler} />
                </div>
                <div className="sm:w-[48%] w-full">
                    <Feild label="Course Duration"
                        value={courseData?.duration}
                        name={'duration'}
                        type='number'
                        onChange={inputChangeHandler} />
                </div>
            </div>
            <div className="flex sm:flex-row flex-col justify-between">
                <div className="sm:w-[48%] w-full">
                    <Feild label="Price"
                        value={courseData?.price}
                        name={'price'}
                        type='number'
                        onChange={inputChangeHandler} />
                </div>
                <div className="sm:w-[48%] w-full">
                    <Feild label="Actual Price"
                        value={courseData?.actualPrice}
                        name={'actualPrice'}
                        type='number'
                        onChange={inputChangeHandler} />
                </div>
            </div>
            <div className="flex flex-col justify-between mt-2">
                <Collapse
                    collapsible="header"
                    defaultActiveKey={null}
                    expandIconPosition='right'
                    accordion
                    items={[
                        {
                            key: '1',
                            label: <p className='font-medium text-gray-600'>{`Upcoming Batches (${data?.upcomingBatches?.length})`}</p>,
                            children:
                                <div className='flex gap-2 flex-col'>
                                    {data?.upcomingBatches?.map((batch, index) => (
                                        <>
                                            <span className='font-medium text-black'>Batch {index + 1}</span>
                                            <div className="flex w-full justify-between flex-row gap-2">
                                                <RangePicker defaultValue={[moment(batch.batchStartDate), moment(batch.batchEndDate)]} format="YYYY-MM-DD" disabled className='w-[95%]' />
                                                <DeleteFilled className='text-red-500 text-lg cursor-pointer flex items-center justify-center'
                                                    onClick={() => handleBatchDelete(index)}
                                                />
                                            </div>
                                        </>
                                    ))}
                                    <div className='flex justify-end'>
                                        <button className='bg-orange-500 text-white rounded py-1 px-2 text-[14px] font-medium'
                                            onClick={() => setIsOpenBatch(true)}
                                        >
                                            Add more
                                        </button>
                                        <CourseModal getAllCourses={getAllCourses} isOpen={isOpenBatch} data={data} title='Batch' setIsOpen={setIsOpenBatch} />
                                    </div>
                                </div>,
                        },
                    ]}
                />
            </div>
            <div className="flex flex-col justify-between mt-2">
                <Collapse
                    collapsible="header"
                    defaultActiveKey={null}
                    expandIconPosition='right'
                    accordion
                    items={[
                        {
                            key: '1',
                            label: <p className='font-medium text-gray-600'>{`Projects (${data?.projects?.length})`}</p>,
                            children:
                                <div className='flex gap-4 flex-col'>
                                    {data?.projects?.map((project, index) => (
                                        <div className='flex flex-col' key={index}>
                                            <p className='font-medium flex justify-between flex-row text-black'>
                                                <span>Project {index + 1}</span>
                                                <DeleteFilled className='text-red-500 text-lg cursor-pointer flex items-center justify-center'
                                                    onClick={() => handleProjectDelete(index)}
                                                />
                                            </p>
                                            <Feild label="Name" value={project.title} />
                                            <Feild label="Description" value={project.description} />
                                        </div>
                                    ))}
                                    <div className='flex justify-end'>
                                        <button className='bg-orange-500 text-white rounded py-1 px-2 text-[14px] font-medium'
                                            onClick={() => setIsOpenProject(true)}
                                        >
                                            Add more
                                        </button>
                                        <CourseModal getAllCourses={getAllCourses} isOpen={isOpenProject} data={data} title='Project' setIsOpen={setIsOpenProject} />
                                    </div>
                                </div>,
                        },
                    ]}
                />
            </div>
            <div className="flex justify-end mt-4">
                <Tooltip title={save ? 'Save your details' : 'Edit something to activate save'} color='black'>
                    <button className={`bg-orange-500 ${save ? 'opacity-100' : 'opacity-50 cursor-not-allowed'} w-1/2 border-orange-500 border sm:w-1/6 text-white p-2 rounded focus:border-none focus:outline-none focus:ring-0`}
                        onClick={() => {
                            saveHandler()
                        }}
                        disabled={!save}
                    >
                        Save
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}

export default CourseCollapse

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClassroom, getTeachers } from "../Redux/Slices/Users/getSlice";
import { MdDelete } from "react-icons/md";

const RegisterClassroom = () => {
    const [classroomName, setClassroomName] = useState("");
    const [classroomCode, setClassroomCode] = useState("");
    const [assignedTeacher, setAssignedTeacher] = useState("");
    const [schedule, setSchedule] = useState([{ day: "", startTime: "", endTime: "" }]);
    const [subjects, setSubjects] = useState([{ subjectName: "" }]);
    const teachers = useSelector((state) => state.get.teachers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTeachers());
    }, [dispatch]);

    const handleScheduleChange = (index, field, value) => {
        const newSchedule = [...schedule];
        newSchedule[index][field] = value;
        setSchedule(newSchedule);
    };

    const addScheduleRow = () => {
        setSchedule([...schedule, { day: "", startTime: "", endTime: "" }]);
    };

    const deleteScheduleRow = (index) => {
        const newSchedule = schedule.filter((_, i) => i !== index);
        setSchedule(newSchedule);
    };

    const handleSubjectChange = (index, field, value) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
    };

    const addSubjectRow = () => {
        setSubjects([...subjects, { subjectName: "" }]);
    };

    const deleteSubjectRow = (index) => {
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createClassroom({
            classroomName,
            classroomCode,
            schedule,
            subjects,
            assignedTeacher
        }));
        window.location.reload();
    };

    return (
        <div className="flex flex-col min-h-screen px-6 lg:px-10">
            <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex flex-col lg:flex-row">
                <div className="flex-1 bg-blue-900 text-center hidden md:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
                        }}
                    ></div>
                </div>
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                            Register Classroom
                        </h1>
                        <p className="text-[12px] text-gray-500">
                            Enter details to create a classroom
                        </p>
                    </div>
                    <form className="flex-1 space-y-6" onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-4">
                            <input
                                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="text"
                                placeholder="Enter classroom name"
                                value={classroomName}
                                onChange={(e) => setClassroomName(e.target.value)}
                            />
                            <input
                                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="text"
                                placeholder="Enter classroom code"
                                value={classroomCode}
                                onChange={(e) => setClassroomCode(e.target.value)}
                            />
                            <select
                                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                value={assignedTeacher}
                                onChange={(e) => setAssignedTeacher(e.target.value)}
                            >
                                <option value="">Select teacher</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher._id} value={teacher._id}>
                                        {teacher.name}
                                    </option>
                                ))}
                            </select>

                            {/* Schedule Inputs */}
                            <div className="flex flex-col gap-4">
                                {schedule.map((sch, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <select
                                            className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none"
                                            value={sch.day}
                                            onChange={(e) =>
                                                handleScheduleChange(index, "day", e.target.value)
                                            }
                                        >
                                            <option value="">Day</option>
                                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                        <label className="text-sm text-gray-600">Start Time</label>
                                        <input
                                            type="time"
                                            className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none"
                                            value={sch.startTime}
                                            onChange={(e) =>
                                                handleScheduleChange(index, "startTime", e.target.value)
                                            }
                                        />
                                        <label className="text-sm text-gray-600">End Time</label>
                                        <input
                                            type="time"
                                            className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none"
                                            value={sch.endTime}
                                            onChange={(e) =>
                                                handleScheduleChange(index, "endTime", e.target.value)
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() => deleteScheduleRow(index)}
                                            className="text-red-600 font-semibold flex items-center justify-center"
                                        >
                                            <MdDelete />
                                        </button>

                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addScheduleRow}
                                    className="text-blue-900 font-semibold"
                                >
                                    + Add Schedule
                                </button>
                            </div>

                            {/* Subject Inputs */}
                            <div className="flex flex-col gap-4 mt-6">
                                {subjects.map((subject, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <input
                                            className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none"
                                            type="text"
                                            placeholder="Subject name"
                                            value={subject.subjectName}
                                            onChange={(e) =>
                                                handleSubjectChange(index, "subjectName", e.target.value)
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() => deleteSubjectRow(index)}
                                            className="text-red-600 font-semibold flex items-center justify-center"
                                        >
                                            <MdDelete />
                                        </button>

                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSubjectRow}
                                    className="text-blue-900 font-semibold"
                                >
                                    + Add Subject
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            >
                                <svg
                                    className="w-6 h-6 -ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span className="ml-3">Register Classroom</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterClassroom;

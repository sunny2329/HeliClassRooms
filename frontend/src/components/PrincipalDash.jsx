import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTeachers, getStudents, updateId } from "../Redux/Slices/Users/getSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrincipalDash = () => {
    const teachers = useSelector((state) => state.get.teachers);
    const students = useSelector((state) => state.get.students);
    const currentUser = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTeachers());
        dispatch(getStudents());
    }, [dispatch])


    const handleDelete = (id, type) => {
        console.log(`Delete ${type} with ID: ${id}`);
    };

    const handleUpdate = async (id, type) => {
        navigate(`/users/update/${id}`);
        console.log(`Update ${type} with ID: ${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Current User Info */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl text-center font-bold text-blue-900 mb-2">Welcome {currentUser?.name}</h2>
                {/* <p className="text-gray-600"><strong>Name:</strong> {currentUser.name}</p>
                <p className="text-gray-600"><strong>Email:</strong> {currentUser.email}</p>
                <p className="text-gray-600"><strong>Role:</strong> {currentUser.role}</p> */}
            </div>

            <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">Dashboard</h1>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Students Table */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-blue-900 mb-4">Students</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b-2 p-3 text-gray-600">Name</th>
                                <th className="border-b-2 p-3 text-gray-600">Email</th>
                                <th className="border-b-2 p-3 text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td className="border-b p-3">{student.name}</td>
                                    <td className="border-b p-3">{student.email}</td>
                                    <td className="border-b p-3">
                                        <button
                                            onClick={() => handleUpdate(student._id, 'student')}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student.id, 'student')}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Teachers Table */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-blue-900 mb-4">Teachers</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b-2 p-3 text-gray-600">Name</th>
                                <th className="border-b-2 p-3 text-gray-600">Email</th>
                                <th className="border-b-2 p-3 text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher) => (
                                <tr key={teacher.id}>
                                    <td className="border-b p-3">{teacher.name}</td>
                                    <td className="border-b p-3">{teacher.email}</td>
                                    <td className="border-b p-3">
                                        <button
                                            onClick={() => handleUpdate(teacher.id, 'teacher')}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(teacher.id, 'teacher')}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};


export default PrincipalDash;

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllClass } from '../Redux/Slices/Users/getSlice';
import ClassroomCard from '../components/ClassroomCard';
function Classrooms() {
    const classrooms = useSelector((state) => state.get.classrooms);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllClass())
    },[]);
    console.log(classrooms);
    if (!classrooms) return <h1>Loading...</h1>
    return (
        <div className="flex gap-6">
            {classrooms.map((classroom, index) => (
                <ClassroomCard
                    key={index}
                    classroomName={classroom.classroomName}
                    classroomCode={classroom.classroomCode}
                />
            ))}
        </div>
    )
}

export default Classrooms

import React from "react";

const ClassroomCard = ({ classroomName, classroomCode }) => {
    return (
        <div className="bg-white border rounded-lg shadow-md p-6 w-64 h-64 flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
                {classroomName}
            </h2>
            <p className="text-gray-600 text-lg">
                Code: {classroomCode}
            </p>
        </div>
    );
};

export default ClassroomCard;

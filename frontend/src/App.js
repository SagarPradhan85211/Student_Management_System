import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsEditing(true);
  };

  const handleUpdateComplete = () => {
    setEditingStudent(null);
    setIsEditing(false);
  };

  return (
    <div className="App">
      <h1>Student Management System</h1>
      {isEditing ? (
        <StudentForm
          editingStudent={editingStudent}
          onSaved={handleUpdateComplete}
        />
      ) : (
        <StudentList onEdit={handleEdit} />
      )}
    </div>
  );
}

export default App;

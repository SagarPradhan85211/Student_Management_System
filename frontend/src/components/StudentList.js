import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchPhone, setSearchPhone] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students')
      .then(res => {
        setStudents(res.data);
        setFilteredStudents(res.data);
      })
      .catch(err => console.error('Error fetching students:', err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddOrUpdate = () => {
    const { name, email, phone, address } = form;

    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }

    if (isEditing) {
      // UPDATE
      axios.put(`http://localhost:5000/api/students/${editId}`, {
        name, email, phone, address
      }).then(() => {
        fetchStudents();
        resetForm();
      }).catch(err => console.error('Error updating student:', err));
    } else {
      // ADD
      axios.post('http://localhost:5000/api/students', {
        name, email, phone, address
      }).then(() => {
        fetchStudents();
        resetForm();
      }).catch(err => console.error('Error adding student:', err));
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address
    });
    setEditId(student.id);
    setIsEditing(true);
  };

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(() => {
        const updated = students.filter(student => student.id !== id);
        setStudents(updated);
        setFilteredStudents(updated);
      })
      .catch(err => console.error('Error deleting student:', err));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchPhone(value);
    if (value === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student =>
        student.phone && student.phone.includes(value)
      );
      setFilteredStudents(filtered);
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', address: '' });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div>
      <div className="add-student-form">
        <h2>{isEditing ? 'Edit Student' : 'Add New Student'}</h2>
        <input name="name" value={form.name} onChange={handleInputChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={handleInputChange} placeholder="Email" />
        <input name="phone" value={form.phone} onChange={handleInputChange} placeholder="Phone" />
        <input name="address" value={form.address} onChange={handleInputChange} placeholder="Address" />
        <button onClick={handleAddOrUpdate}>
          {isEditing ? 'Update Student' : 'Add Student'}
        </button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </div>

      <div className="search-student">
        <h2>Search Student</h2>
        <input
          type="text"
          placeholder="Enter phone number"
          value={searchPhone}
          onChange={handleSearch}
        />
      </div>

      <div className="tableclass">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr><td colSpan="5">No students found.</td></tr>
            ) : (
              filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone || '-'}</td>
                  <td>{student.address || '-'}</td>
                  <td>
                    <button onClick={() => handleEdit(student)}>Edit</button>
                    <button onClick={() => deleteStudent(student.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;

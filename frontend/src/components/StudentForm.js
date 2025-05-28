// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function StudentForm({ editingStudent, onSaved }) {
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     email: '',
//     phone: '',
//     address: ''
//   });

//   useEffect(() => {
//     if (editingStudent) {
//       setFormData(editingStudent);
//     }
//   }, [editingStudent]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.put(`http://localhost:5000/api/students/${formData.id}`, formData)
//       .then(() => {
//         alert("Student updated successfully.");
//         onSaved();
//       })
//       .catch(err => console.error("Update error:", err));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Edit Student</h2>
//       <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
//       <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//       <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
//       <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
//       <button type="submit">Update</button>
//     </form>
//   );
// }

// export default StudentForm;

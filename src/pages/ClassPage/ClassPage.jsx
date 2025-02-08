import React from 'react';
import { useParams } from 'react-router-dom';
import './ClassPage.scss';

function ClassPage() {
  const { id } = useParams();

  return (
    <div className="class-page">
      <h1>Class Details</h1>
      {/* Add your class details content here */}
      <p>Class ID: {id}</p>
    </div>
  );
}

export default ClassPage; 
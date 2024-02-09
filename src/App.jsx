import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [isPriority, setIsPriority] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'den hastaları al
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  useEffect(() => {
    // patients state'i değiştiğinde localStorage'e kaydet
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const handleAddPatient = () => {
    if (name.trim() !== '') {
      const newPatient = {
        id: uuidv4(),
        name,
        isPriority,
      };
      setPatients([...patients, newPatient]);
      setName('');
      setIsPriority(false);
    }
  };

  const handleDeletePatient = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  const handleUpdatePriority = (id) => {
    const updatedPatients = patients.map((patient) => {
      if (patient.id === id) {
        return { ...patient, isPriority: !patient.isPriority };
      }
      return patient;
    });
    setPatients(updatedPatients);
  };

  return (
    <div className="App">
      <h1>Matematik Dersi Alan Öğrencilerim</h1>
      <div className="patient-form">
        <input
          type="text"
          placeholder="Öğrencinin Adı-Soyadı"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>
          Ödendi
          <input
            type="checkbox"
            checked={isPriority}
            onChange={() => setIsPriority(!isPriority)}
          />
        </label>
        <button onClick={handleAddPatient}> Ekle</button>
      </div>
      <h2>Öğrencilerim</h2>
      <div className="patient-list">
        {patients.map((patient) => (
          <div key={patient.id} className={`patient ${patient.isPriority ? 'priority' : ''}`}>
            <span>{patient.name}</span>
            <div>
              <button onClick={() => handleUpdatePriority(patient.id)}>
                {patient.isPriority ? 'Ödendi' : 'Ödenmedi'}
              </button>
              <button onClick={() => handleDeletePatient(patient.id)}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
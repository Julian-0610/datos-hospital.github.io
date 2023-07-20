document.addEventListener("DOMContentLoaded", () => {
  const doctorForm = document.getElementById("doctorForm");
  const patientForm = document.getElementById("patientForm");
  const doctorList = document.getElementById("doctorList");
  const patientList = document.getElementById("patientList");

  let doctors = [];
  let patients = [];

  // Función para guardar los datos del formulario de doctores
  const saveDoctor = (event) => {
    event.preventDefault();

    const doctorName = document.getElementById("doctorName").value;
    const doctorLastName = document.getElementById("doctorLastName").value;
    const doctorID = document.getElementById("doctorID").value;
    const specialty = document.getElementById("specialty").value;
    const office = document.getElementById("office").value;
    const doctorEmail = document.getElementById("doctorEmail").value;

    const doctor = {
      nombre: doctorName,
      apellido: doctorLastName,
      cedula: doctorID,
      especialidad: specialty,
      consultorio: office,
      correo: doctorEmail,
    };

    doctors.push(doctor);
    saveToJSON("doctors.json", doctors);
    doctorForm.reset();
    displayDoctorList();
  };
  
  const savePatient = (event) => {
    event.preventDefault();

    const patientName = document.getElementById("patientName").value;
    const patientLastName = document.getElementById("patientLastName").value;
    const patientID = document.getElementById("patientID").value;
    const patientAge = document.getElementById("patientAge").value;
    const patientPhone = document.getElementById("patientPhone").value;
    const patientSpecialty = document.getElementById("patientSpecialty").value;

    const patient = {
      nombre: patientName,
      apellido: patientLastName,
      cedula: patientID,
      edad: patientAge,
      telefono: patientPhone,
      especialidad: patientSpecialty,
    };

    patients.push(patient);
    saveToJSON("patients.json", patients);
    patientForm.reset();
    displayPatientList();
  };

  const saveToJSON = (filename, data) => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const displayDoctorList = () => {
    doctorList.innerHTML = ""; // Limpiamos el contenido previo
    doctors.forEach((doctor) => {
      const doctorInfo = document.createElement("div");
      doctorInfo.innerHTML = `
        <p><strong>Nombre:</strong> ${doctor.nombre} ${doctor.apellido}</p>
        <p><strong>Número de Cédula:</strong> ${doctor.cedula}</p>
        <p><strong>Especialidad:</strong> ${doctor.especialidad}</p>
        <p><strong>Consultorio:</strong> ${doctor.consultorio}</p>
        <p><strong>Correo de contacto:</strong> ${doctor.correo}</p>
        <hr>
      `;
      doctorList.appendChild(doctorInfo);
    });
  };

  const displayPatientList = () => {
    patientList.innerHTML = ""; // Limpiamos el contenido previo
    patients.forEach((patient) => {
      const patientInfo = document.createElement("div");
      patientInfo.innerHTML = `
        <p><strong>Nombre:</strong> ${patient.nombre} ${patient.apellido}</p>
        <p><strong>Número de Cédula:</strong> ${patient.cedula}</p>
        <p><strong>Edad:</strong> ${patient.edad}</p>
        <p><strong>Teléfono:</strong> ${patient.telefono}</p>
        <p><strong>Especialidad requerida:</strong> ${patient.especialidad}</p>
        <hr>
      `;
      patientList.appendChild(patientInfo);
    });
  };

  document.getElementById("doctorForm").addEventListener("submit", saveDoctor);
  document.getElementById("patientForm").addEventListener("submit", savePatient);

  // Leer el archivo JSON de doctores y pacientes (si existen) y mostrar la lista
  fetch("doctors.json")
    .then((response) => response.json())
    .then((data) => {
      doctors = data;
      displayDoctorList();
    });

  fetch("patients.json")
    .then((response) => response.json())
    .then((data) => {
      patients = data;
      displayPatientList();
    });
});

const axios = require("axios");

const API = "http://localhost:3000";

// cuántos usuarios crear
const USERS = 5;

// cuántas consultas crear por usuario
const CONSULTATIONS = 3;

async function createUser(index) {
  const user = {
    name: `Usuario_${index}`,
    lastName: `Test_${index}`,
    age: 30,
    gender: "M",
  };

  const res = await axios.post(`${API}/patient`, user);
  return res.data; // devuelve patient creado
}

async function createConsultation(patientId, cIndex) {
  const consultation = {
    patientId,
    date: new Date().toISOString(),
    reason: `Consulta ${cIndex}`,
    doctor: `test ${cIndex%10}`,
    "vitals": {
    "weight": 72,
    "height": 170,
    "pressure": "120/80"
  }
  };

  const res = await axios.post(`${API}/consultation`, consultation);
  return res.data;
}

async function getHistory(patientId) {
  const res = await axios.get(`${API}/patient/history/${patientId}`);
  return res.data;
}

async function run() {
  console.log("🚀 Iniciando test...");

  for (let u = 0; u < USERS; u++) {
    console.log(`\n🧍 Creando usuario ${u + 1}/${USERS}...`);

    // 1. Crear usuario
    const user = await createUser(u + 1);
    console.log("   ✔ Usuario creado:", user._id);

    // 2. Crear múltiples consultas
    for (let c = 0; c < CONSULTATIONS; c++) {
      const cons = await createConsultation(user._id, c + 1);
      console.log(`   ➕ Consulta creada ${c + 1}/${CONSULTATIONS}`);
    }

    // 3. Consultar historial
    const history = await getHistory(user._id);

    console.log(`   📄 Historial de usuario ${user._id}:`);
    console.log(history);
  }

  console.log("\n🔥 Test finalizado");
}

run().catch((err) => {
  console.error("❌ Error:", err.response?.data || err.message);
});

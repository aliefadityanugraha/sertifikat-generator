const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzf8tzszSug6tEQDXqiXIZCxBDyhSEvghKerWciDlvrZM6yuukTITknjnlI-QJo7bhUvQ/exec';

const normalize = (data) => {
  if (!data) return null;
  return {
    id: data.ID || data.id,
    nama: data.NAMA || data.nama,
    kelas: data.KELAS || data.kelas,
    nomor_sertifikat: data.NOMOR || data.nomor_sertifikat,
    status: data.STATUS || data.status
  };
};

const mapToApi = (student) => {
  return {
    ID: student.id || student.nomor_sertifikat, // fallback to nomorsertifikat as id
    NAMA: student.nama,
    KELAS: student.kelas,
    NOMOR: student.nomor_sertifikat
  };
};

export const api = {
  async getStudents() {
    try {
      const res = await fetch(`${SCRIPT_URL}?action=read`);
      if (!res.ok) throw new Error('Network response was not ok');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data.map(normalize);
      }
      return [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  
  async findStudent(nama, kelas) {
    try {
      const params = new URLSearchParams({ action: 'find', nama, kelas });
      const res = await fetch(`${SCRIPT_URL}?${params.toString()}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data.map(normalize);
      }
      return [];
    } catch (e) {
      console.error(e);
      // Dummy response for preview purposes if real API is missing
      if (nama.toLowerCase() === 'dummy') return [{ nama: 'Dummy User', kelas: 'X', nomor_sertifikat: '123/PR/XIV/2026' }];
      return [];
    }
  },
  
  async createStudent(student) {
    const res = await fetch(`${SCRIPT_URL}?action=create`, {
      method: 'POST',
      body: JSON.stringify(mapToApi(student)),
    });
    const json = await res.json().catch(() => null);
    return json?.success ? json.data : null;
  },
  
  async updateStudent(student) {
    const res = await fetch(`${SCRIPT_URL}?action=update`, {
      method: 'POST',
      body: JSON.stringify(mapToApi(student)),
    });
    const json = await res.json().catch(() => null);
    return json?.success ? json.data : null;
  },
  
  async deleteStudent(id) {
    const res = await fetch(`${SCRIPT_URL}?action=delete`, {
      method: 'POST',
      body: JSON.stringify({ ID: id }),
    });
    const json = await res.json().catch(() => null);
    return json?.success ? json.data : null;
  },
  
  async recordGenerate(student) {
    try {
      await fetch(`${SCRIPT_URL}?action=record_log`, {
        method: 'POST',
        // mode: 'no-cors' allows sending cross-origin blind POSTs without preflight
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: student.id || student.nomor_sertifikat || "N/A",
          NAMA: student.nama,
          KELAS: student.kelas,
          NOMOR: student.nomor_sertifikat
        }),
      });
      return true;
    } catch (e) {
      console.error('Failed to send generate record log', e);
      return false;
    }
  }
};

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwMK26xM7FU8EixIYWzFJIurLRAFOqwUiSTF69vi_qMsLaZm8BlC-lKlgqekio6rwOTbw/exec';

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
    ID: student.id,
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
      const data = await res.json();
      return Array.isArray(data) ? data.map(normalize) : [];
    } catch (e) {
      console.error(e);
      return []; // Return dummy or empty if URL is invalid dummy
    }
  },
  
  async findStudent(nama, kelas) {
    try {
      const params = new URLSearchParams({ action: 'find', nama, kelas });
      const res = await fetch(`${SCRIPT_URL}?${params.toString()}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return Array.isArray(data) ? data.map(normalize) : [];
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
    return await res.json().catch(() => null);
  },
  
  async updateStudent(student) {
    const res = await fetch(`${SCRIPT_URL}?action=update`, {
      method: 'POST',
      body: JSON.stringify(mapToApi(student)),
    });
    return await res.json().catch(() => null);
  },
  
  async deleteStudent(id) {
    const res = await fetch(`${SCRIPT_URL}?action=delete`, {
      method: 'POST',
      body: JSON.stringify({ ID: id }),
    });
    return await res.json().catch(() => null);
  }
};

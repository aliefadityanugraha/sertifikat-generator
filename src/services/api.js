/**
 * Base URL for the Google Apps Script API endpoint.
 * @constant {string}
 */
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyvw_oriLgJAV5slmcRp-UPdEQqk7JAFQGzJqkZ4oboUbTRknLpEOlf7A-cF4_8O-RKbA/exec';

/**
 * Normalizes raw data from the API to a consistent frontend object structure.
 * @param {Object} data - The raw student data object from the API.
 * @returns {Object|null} The normalized student object, or null if no data provided.
 */
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

/**
 * Maps a frontend student object back to the format expected by the API.
 * @param {Object} student - The normalized frontend student object.
 * @returns {Object} The mapped object ready to be sent to the API.
 */
const mapToApi = (student) => {
  return {
    ID: student.id || student.nomor_sertifikat, // fallback to nomorsertifikat as id
    NAMA: student.nama,
    KELAS: student.kelas,
    NOMOR: student.nomor_sertifikat
  };
};

/**
 * API service object containing methods to interact with the backend.
 */
export const api = {
  /**
   * Fetches the complete list of students from the database.
   * @async
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of normalized student objects.
   */
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
  
  /**
   * Finds a specific student based on exact name and class match.
   * @async
   * @param {string} nama - The exact name of the student.
   * @param {string} kelas - The exact class of the student.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array containing the matched student(s).
   */
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
  
  /**
   * Creates a new student record in the database.
   * @async
   * @param {Object} student - The student object to be created.
   * @returns {Promise<Object|null>} The newly created student data if successful, otherwise null.
   */
  async createStudent(student) {
    const res = await fetch(`${SCRIPT_URL}?action=create`, {
      method: 'POST',
      body: JSON.stringify(mapToApi(student)),
    });
    const json = await res.json().catch(() => null);
    return json?.success ? json.data : null;
  },
  
  /**
   * Updates an existing student record in the database.
   * @async
   * @param {Object} student - The student object containing updated data (must include ID or nomor_sertifikat).
   * @returns {Promise<Object|null>} The updated student data if successful, otherwise null.
   */
  async updateStudent(student) {
    const res = await fetch(`${SCRIPT_URL}?action=update`, {
      method: 'POST',
      body: JSON.stringify(mapToApi(student)),
    });
    const json = await res.json().catch(() => null);
    return json?.success ? json.data : null;
  },
  
  /**
   * Deletes a student record from the database.
   * @async
   * @param {string|number} id - The ID or certificate number of the student to delete.
   * @returns {Promise<Object|null>} The deleted record data if successful, otherwise null.
   */
  async deleteStudent(id) {
    const res = await fetch(`${SCRIPT_URL}?action=delete`, {
      method: 'POST',
      body: JSON.stringify({ ID: id }),
    });
    const json = await res.json().catch(() => null);
    return json?.success ? json.data : null;
  },
  
  /**
   * Records a log entry when a student successfully generates a certificate.
   * @async
   * @param {Object} student - The student object who generated the certificate.
   * @returns {Promise<boolean>} True if the log was successfully explicitly fired (blindly), otherwise false.
   */
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
  },

  /**
   * Fetches the generation history logs from the server.
   * @async
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of log records.
   */
  async getLogs() {
    try {
      const res = await fetch(`${SCRIPT_URL}?action=logs`);
      if (!res.ok) throw new Error('Network response was not ok');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
      return [];
    } catch (e) {
      console.error(e);
      return [];
    }
  }
};

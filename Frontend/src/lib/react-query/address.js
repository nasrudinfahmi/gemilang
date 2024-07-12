async function getProvinsi() {
  const url = "/provinsi/get/";
  const response = await fetch(import.meta.env.VITE_INDO_LOCATION_API + url);
  const data = await response.json();

  const provinsi = data.result.map((provinsi) => {
    return { value: provinsi.id, label: provinsi.text };
  });

  return provinsi;
}

async function getKabKota(idProvinsi) {
  const url = `/kabkota/get/?d_provinsi_id=${idProvinsi}`;
  const response = await fetch(import.meta.env.VITE_INDO_LOCATION_API + url);
  const data = await response.json();

  const kabKota = data.result.map((kota) => {
    return { value: kota.id, label: kota.text };
  });

  return kabKota;
}

async function getKecamatan(kabKota) {
  const url = `/kecamatan/get/?d_kabkota_id=${kabKota}`;
  const response = await fetch(import.meta.env.VITE_INDO_LOCATION_API + url);
  const data = await response.json();

  const kecamatan = data.result.map((kecamatan) => {
    return { value: kecamatan.id, label: kecamatan.text };
  });

  return kecamatan;
}

async function getKelurahan(kecamatan) {
  const url = `/kelurahan/get/?d_kecamatan_id=${kecamatan}`;
  const response = await fetch(import.meta.env.VITE_INDO_LOCATION_API + url);
  const data = await response.json();

  const kelurahan = data.result.map((kelurahan) => {
    return { value: kelurahan.id, label: kelurahan.text };
  });

  return kelurahan;
}

async function getKodePos(idKabKota, idKecamatan) {
  const url = `/kodepos/get/?d_kabkota_id=${idKabKota}&d_kecamatan_id=${idKecamatan}`;
  const response = await fetch(import.meta.env.VITE_INDO_LOCATION_API + url);
  const data = await response.json();

  const kodepos = data.result.map((kodepos) => {
    return { value: kodepos.id, label: kodepos.text };
  });

  return kodepos;
}

const getLocation = {
  getProvinsi,
  getKabKota,
  getKecamatan,
  getKelurahan,
  getKodePos,
};

export { getLocation };

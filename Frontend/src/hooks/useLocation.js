import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../lib/react-query/address";

const useKota = (idProvinsi) => {
  return useQuery({
    queryKey: ["kota", idProvinsi],
    queryFn: async () => {
      if (!idProvinsi) {
        return []; // Return empty array or appropriate default value if idProvinsi is not provided
      }
      return await getLocation.getKabKota(idProvinsi);
    },
    enabled: !!idProvinsi, // Query will not execute until the idProvinsi exists
  });
};

const useKecamatan = (idKabKota) => {
  return useQuery({
    queryKey: ["kecamatan", idKabKota],
    queryFn: async () => {
      if (!idKabKota) {
        return [];
      }
      return await getLocation.getKecamatan(idKabKota);
    },
    enabled: !!idKabKota,
  });
};

const useKelurahan = (idKelurahan) => {
  return useQuery({
    queryKey: ["kelurahan", idKelurahan],
    queryFn: async () => {
      if (!idKelurahan) {
        return [];
      }
      return await getLocation.getKelurahan(idKelurahan);
    },
    enabled: !!idKelurahan,
  });
};

const useKodePos = (idKabKota, idKecamatan) => {
  return useQuery({
    queryKey: ["kelurahan", idKabKota, idKecamatan],
    queryFn: async () => {
      if (!idKabKota && idKecamatan) {
        return [];
      }
      return await getLocation.getKodePos(idKabKota, idKecamatan);
    },
    enabled: !!idKabKota && !!idKecamatan,
  });
};

const locations = { useKota, useKecamatan, useKelurahan, useKodePos };

export { locations };

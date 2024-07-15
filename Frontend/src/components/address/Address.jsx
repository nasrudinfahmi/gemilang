import PropTypes from 'prop-types'
import Select from 'react-select'
import { useState } from "react"
import { getLocation } from "../../lib/react-query/address"
import { useQuery } from "@tanstack/react-query"
import { locations } from "../../hooks/useLocation"

function Address({ address, setAddress }) {
  const [characterDetailAddress, setCharacterDetailAddress] = useState(50)

  const provinsi = useQuery({
    queryKey: ['provinsi'],
    queryFn: async () => await getLocation.getProvinsi()
  })

  const kabKota = locations.useKota(address?.provinsi?.value)
  const kecamatan = locations.useKecamatan(address?.kabKota?.value)
  const kelurahan = locations.useKelurahan(address?.kecamatan?.value)
  const kodePos = locations.useKodePos(address?.kabKota?.value, address?.kecamatan?.value)

  const handleSelectProvinsi = (provinsi) => {
    setAddress({ provinsi })
  }

  const handleSelectKabKota = (kabKota) => {
    setAddress(prevAddres => ({
      provinsi: prevAddres.provinsi,
      kabKota,
    }))
  }

  const handleSelectKecamatan = (kecamatan) => {
    setAddress(prevAddres => ({
      provinsi: prevAddres.provinsi,
      kabKota: prevAddres.kabKota,
      kecamatan,
    }))
  }

  const handleSelectKelurahan = (kelurahan) => {
    setAddress(prevAddres => ({
      provinsi: prevAddres.provinsi,
      kabKota: prevAddres.kabKota,
      kecamatan: prevAddres.kecamatan,
      kelurahan,
    }))
  }

  const handleDetailAlamat = (e) => {
    setAddress(prevAddres => ({
      provinsi: prevAddres.provinsi,
      kabKota: prevAddres.kabKota,
      kecamatan: prevAddres.kecamatan,
      kelurahan: prevAddres.kelurahan,
      kodepos: prevAddres.kodepos,
      detailAddress: e.target?.value?.trim(),
    }))

    setCharacterDetailAddress(60 - Number(e.target.value.length))
  }

  const handleSelectKodePos = (kodepos) => {
    setAddress(prevAddres => ({
      provinsi: prevAddres.provinsi,
      kabKota: prevAddres.kabKota,
      kecamatan: prevAddres.kecamatan,
      kelurahan: prevAddres.kelurahan,
      detailAddress: prevAddres.detailAddress,
      kodepos,
    }))
  }

  return (
    <>
      <label htmlFor="provinsi" className="flex flex-col gap-1">
        <span>Provinsi</span>
        <Select
          isDisabled={provinsi.isLoading}
          inputId="provinsi"
          placeholder={provinsi.isLoading ? "Loading" : address?.provinsi ? address.provinsi.label : "Provinsi"}
          options={provinsi.data}
          isLoading={provinsi.isLoading}
          onChange={handleSelectProvinsi}
          defaultValue={address.provinsi}
          defaultInputValue={address?.provinsi?.label || ""}
          styles={{
            control: (state) => ({
              ...state,
              borderRadius: "6px"
            })
          }}
        />
      </label>

      {!kabKota.isLoading && kabKota.data && (
        <label htmlFor="kabKota" className="flex flex-col gap-1">
          <span>Kabupaten/Kota</span>
          <Select
            isDisabled={kabKota.isLoading}
            inputId="kabKota"
            placeholder={kabKota.isLoading ? "Loading" : "Kabupaten/Kota"}
            options={kabKota.data}
            isLoading={kabKota.isLoading}
            onChange={handleSelectKabKota}
            defaultValue={address.kabKota}
            styles={{
              control: (state) => ({
                ...state,
                borderRadius: "6px"
              })
            }}
          />
        </label>
      )}

      {!kecamatan.isLoading && kecamatan.data && (
        <label htmlFor="kecamatan" className="flex flex-col gap-1">
          <span>Kecamatan</span>
          <Select
            isDisabled={kecamatan.isLoading}
            inputId="kecamatan"
            placeholder={kecamatan.isLoading ? "Loading" : "Kecamatan"}
            options={kecamatan.data}
            isLoading={kecamatan.isLoading}
            onChange={handleSelectKecamatan}
            defaultValue={address.kecamatan}
            styles={{
              control: (state) => ({
                ...state,
                borderRadius: "6px"
              })
            }}
          />
        </label>
      )}

      {!kelurahan.isLoading && kelurahan.data && (
        <label htmlFor="kelurahan" className="flex flex-col gap-1">
          <span>Kelurahan</span>
          <Select
            isDisabled={kelurahan.isLoading}
            inputId="kelurahan"
            placeholder={kelurahan.isLoading ? "Loading" : "Kelurahan"}
            options={kelurahan.data}
            isLoading={kelurahan.isLoading}
            onChange={handleSelectKelurahan}
            defaultValue={address.kelurahan}
            styles={{
              control: (state) => ({
                ...state,
                borderRadius: "6px"
              })
            }}
          />
        </label>
      )}

      {address.kelurahan && (
        <label htmlFor="detailAlamat" className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span>Detail Alamat</span>
            <span>{characterDetailAddress}</span>
          </div>
          <textarea
            name="detailAlamat"
            id="detailAlamat"
            rows={4}
            spellCheck={false}
            autoComplete="off"
            placeholder="Detail Alamat"
            onChange={handleDetailAlamat}
            defaultValue={address.detailAddress}
            maxLength={60}
            className="border outline-none py-1.5 px-3 rounded-md sm:text-lg"
          />
        </label>
      )}

      {address.detailAddress && !kodePos.isLoading && kodePos.data && (
        <label htmlFor="kodePos" className="flex flex-col gap-1">
          <span>Kodepos</span>
          <Select
            isDisabled={kodePos.isLoading}
            inputId="kelurahan"
            placeholder={kodePos.isLoading ? "Loading" : "Kodepos"}
            options={kodePos.data}
            isLoading={kodePos.isLoading}
            defaultValue={address.kodepos}
            onChange={handleSelectKodePos}
            styles={{
              control: (state) => ({
                ...state,
                borderRadius: "6px"
              })
            }}
          />
        </label>
      )}
    </>
  )
}

Address.propTypes = {
  address: PropTypes.object.isRequired,
  setAddress: PropTypes.func.isRequired,
}

export default Address
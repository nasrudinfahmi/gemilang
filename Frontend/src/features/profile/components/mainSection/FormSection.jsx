import { useEffect, useState } from "react"
import { icons } from "../../../../assets"
import Input1 from "../../../../components/input/InputField"
import { auth } from "../../../../lib/firebase/init"
import Select from 'react-select'
import { useQuery } from '@tanstack/react-query'
import { getLocation } from "../../../../lib/react-query/address"
import { locations } from "../../../../hooks/useLocation"
import { readData, setData } from "../../../../services/firestore"
import { Toast } from "../../../../lib/sweetalert2/init"
import { deleteFile, uploadFile } from "../../../../services/storage"
import { updateProfile } from 'firebase/auth'
import { getFileNameFromUrl } from "../../../../utils/utils"

function FormSection() {
  const currentUser = auth.currentUser
  const [user, setUser] = useState({
    email: currentUser.email,
    displayName: currentUser.displayName || "",
    phoneNumber: currentUser.phoneNumber || "",
  })

  const [photoPofile, setPhotoProfile] = useState({ blob: currentUser.photoURL || null })


  const handleChangePhotoProfile = (e) => {
    const blobUrl = URL.createObjectURL(e.target.files[0])
    setPhotoProfile({ blob: blobUrl, file: e.target.files[0] })
  }

  const handleChangeProfile = e => {
    const key = e.target.name

    setUser(prevValue => {
      return ({
        ...prevValue,
        [key]: e.target.value
      })
    })
  }

  const [address, setAddress] = useState({})
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

  const handleChangeData = async () => {
    if (!user.phoneNumber.trim() || !user.displayName.trim() || !user.email.trim() || Object.keys(address).length < 6) {
      return Toast.fire({
        icon: 'error',
        title: 'Lengkapi Data Anda!'
      })
    }

    const ext = photoPofile?.file?.type?.split('image/')[1]
    const fileName = currentUser.uid + ext
    const imgUrl = await saveImg('user', fileName, photoPofile.file)


    await setData(`user/${currentUser.uid}`, {
      idUser: currentUser.uid,
      idSeller: null,
      role: 'buyer',
      photoURL: imgUrl,
      phoneNumber: user.phoneNumber,
      email: user.email,
      emailVerified: currentUser.emailVerified,
      displayName: user.displayName,
      address,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await updateProfile(auth.currentUser, {
      displayName: user.displayName,
      photoURL: imgUrl,
    })

    if (!imgUrl) {
      const fileName = getFileNameFromUrl(auth.currentUser.photoURL)?.split('/')[1]
      await deleteFile('user', fileName)

      await updateProfile(auth.currentUser, {
        photoURL: "",
      })
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const user = await readData('user', currentUser.uid)
      setUser({ displayName: user.displayName, phoneNumber: user.phoneNumber, photoURL: user.photoURL || icons.defaultAvatar, email: user.email })

      setAddress(user.address)
    }

    fetchUser()
    console.log(auth.currentUser)
  }, [currentUser])

  async function saveImg(path, fileName, file) {
    if (!photoPofile?.file) return null;

    const prevFileUrl = auth.currentUser.photoURL
    if (prevFileUrl) {
      const fileName = getFileNameFromUrl(prevFileUrl)?.split('/')[1]
      await deleteFile(path, fileName)
    }

    const pathUrl = `${path}/${fileName}`
    const fileUrl = await uploadFile(pathUrl, file)

    return fileUrl
  }

  return (
    <section className="w-full lg:w-3/4 xl:w-2/3 flex flex-col gap-6 mt-8 px-6 sm:pl-12 md:pl-72 py-2 transition-transform">
      <div className="flex items-center gap-4">
        <img src={photoPofile.blob || icons.defaultAvatar} alt="photo profile" width={64} height={64} className="rounded-full overflow-hidden shadow-sm border border-slate-100 object-cover object-center w-16 h-16 aspect-square" />

        <div className="flex min-[500px]:items-center max-[500px]:flex-col max-[500px]:gap-1.5 gap-4">
          <label htmlFor="editAvatar">
            <span
              type="button"
              title="Ganti Foto"
              aria-label="ganti foto profil"
              className="border cursor-pointer py-1 px-4 rounded-md bg-slate-50 hover:bg-slate-200 hover:shadow flex-1 block text-center">
              Ganti Foto
            </span>

            <input
              type="file"
              name="editAvatar"
              id="editAvatar"
              multiple={false}
              accept="image/*"
              className="hidden"
              onChange={handleChangePhotoProfile}
            />
          </label>

          <button
            type="button"
            title="Hapus Foto"
            aria-label="Hapus Foto"
            className="text-center border py-1 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white hover:shadow"
            onClick={() => setPhotoProfile({ file: null, blob: null })}
          >Hapus Foto
          </button>
        </div>
      </div>

      <Input1 id="name" name="displayName" label="Nama" value={user.displayName} onChange={handleChangeProfile} />
      <Input1 type="email" id="email" name="email" label="Email" readOnly value={user.email} />
      <Input1 type="tel" id="phone" name="phoneNumber" label="Telepon" value={user.phoneNumber || ""} onChange={handleChangeProfile} />

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

      <button
        type="button"
        title="Simpan"
        aria-label="Simpan Perubahan"
        className="mt-6 bg-slate-800 hover:bg-stone-800 hover:shadow-md text-white py-1.5 rounded-md transition-colors"
        onClick={handleChangeData}
      >
        Simpan
      </button>
    </section>
  )
}

export default FormSection
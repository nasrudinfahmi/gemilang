import { useState } from "react"
import { icons } from "../../assets"
import Input1 from "../input/InputField"
import { auth } from "../../lib/firebase/init"
import { setData, updateData } from "../../services/firestore"
import { loadingToast, Toast } from "../../lib/sweetalert2/init"
import { saveImg } from "../../services/storage"
import Address from '../address/Address'
import { generateRandomId } from "../../utils/utils"
import { useUser } from "../../hooks/useUser"

function SellerRegister() {
  const currentUser = auth.currentUser

  const [seller, setSeller] = useState({ storeName: "", email: "", phoneNumber: "" })

  const [address, setAddress] = useState({})
  const [photoPofile, setPhotoProfile] = useState({ blob: null, file: null })
  const { user, setUser } = useUser()

  const handleChangePhotoProfile = (e) => {
    const blobUrl = URL.createObjectURL(e.target.files[0])
    setPhotoProfile({ blob: blobUrl, file: e.target.files[0] })
  }

  const handleChangeValue = e => {
    const key = e.target.name

    setSeller(prevValue => {
      return ({
        ...prevValue,
        [key]: e.target.value
      })
    })
  }

  const handleSubmit = async () => {
    if (!seller.phoneNumber.trim() ||
      !seller.storeName.trim() ||
      !seller.email.trim() ||
      Object.keys(address).length < 6) {
      return Toast.fire({
        icon: 'error',
        title: 'Lengkapi Data Anda!'
      })
    }

    loadingToast().fire()

    const id = generateRandomId()
    const ext = photoPofile?.file?.type?.split('image/')[1]
    const fileName = id + ext
    const imgUrl = await saveImg({
      path: 'seller',
      fileName,
      file: photoPofile.file,
    })

    await setData(`seller/${id}`, {
      idSeller: id,
      storeName: seller.storeName,
      phoneNumber: seller.phoneNumber,
      email: seller.email,
      photoURL: imgUrl,
      address,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await updateData('user', currentUser.uid, { idSeller: id, role: 'seller' })
    await setUser({ ...user, idSeller: id, role: 'seller' })

    Toast.fire({
      icon: 'success',
      title: 'Berhasil Membuat Toko'
    })
  }

  return (
    <section className="w-full lg:w-3/4 xl:w-2/3 flex flex-col gap-6 mt-8 px-6 sm:pl-12 md:pl-72 py-2 transition-transform">
      <div className="flex items-center gap-4 mb-6">
        <img src={photoPofile.blob || icons.defaultAvatar2} alt="photo profile" width={64} height={64} className="rounded-full overflow-hidden shadow-sm border border-slate-100 object-cover object-center w-16 h-16 aspect-square" />

        <div className="flex min-[500px]:items-center max-[500px]:flex-col max-[500px]:gap-1.5 gap-4">
          <label htmlFor="editAvatar">
            <span
              type="button"
              title="Masukkan Foto"
              aria-label="Masukkan foto seller"
              className="border cursor-pointer py-1 px-4 rounded-md bg-slate-50 hover:bg-slate-200 hover:shadow flex-1 block text-center">
              Masukkan Foto
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

      <Input1 id="name" name="storeName" label="Nama Toko" value={seller.storeName} onChange={handleChangeValue} />
      <Input1 type="email" id="email" name="email" label="Email" value={seller.email} onChange={handleChangeValue} />
      <Input1 type="tel" id="phone" name="phoneNumber" label="Telepon" value={seller.phoneNumber} onChange={handleChangeValue} />

      <Address address={address} setAddress={setAddress} />

      <button
        type="button"
        title="Simpan"
        aria-label="Simpan Perubahan"
        className="mt-6 bg-slate-800 hover:bg-stone-800 hover:shadow-md text-white py-1.5 rounded-md transition-colors"
        onClick={handleSubmit}
      >
        Kirim
      </button>
    </section>
  )
}

export default SellerRegister
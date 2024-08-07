import { updateProfile } from 'firebase/auth'
import { useContext, useEffect, useState } from "react"
import { icons } from '../../../assets'
import Input1 from '../../../components/input/InputField'
import { auth } from '../../../lib/firebase/init'
import { readData, setData } from "../../../services/firestore"
import { loadingToast, Toast } from "../../../lib/sweetalert2/init"
import { deleteFile, saveImg } from "../../../services/storage"
import { getFileNameFromUrl } from '../../../utils/utils'
import Address from '../../../components/address/Address'
import { usePhotoProfile } from '../../../hooks/usePhotoProfile'
import { UserContext } from '../../../context/UserContext'

function FormSection() {
  const currentUser = auth.currentUser
  const { setPhotoProfileUrl } = usePhotoProfile()
  const { user: dataUser, setUser: setDataUser } = useContext(UserContext)

  const [user, setUser] = useState({
    email: currentUser.email,
    displayName: currentUser.displayName || "",
    phoneNumber: currentUser.phoneNumber || "",
  })

  const [address, setAddress] = useState({})
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

  const handleChangeData = async () => {
    if (!user.phoneNumber.trim() ||
      !user.displayName.trim() ||
      !user.email.trim() ||
      Object.keys(address).length < 6) {
      return Toast.fire({
        icon: 'error',
        title: 'Lengkapi Data Anda!'
      })
    }

    loadingToast().fire()

    const ext = photoPofile?.file?.type?.split('image/')[1]
    const fileName = currentUser.uid + ext
    const imgUrl = await saveImg({
      path: 'user',
      fileName,
      file: photoPofile.file,
      urlToDelete: currentUser.photoURL,
    })

    const newDataUser = {
      idUser: currentUser.uid,
      idSeller: dataUser ? dataUser.idSeller : null,
      role: dataUser.role,
      photoURL: imgUrl,
      phoneNumber: user.phoneNumber,
      email: user.email,
      emailVerified: currentUser.emailVerified,
      displayName: user.displayName,
      address,
      createdAt: dataUser.createdAt ? dataUser.createdAt : new Date(),
      updatedAt: new Date(),
    }

    await setData(`user/${currentUser.uid}`, newDataUser)

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

    setPhotoProfileUrl(imgUrl)
    setDataUser(newDataUser)

    Toast.fire({
      icon: 'success',
      title: 'Update Profil Sukses'
    })
  }

  useEffect(() => {
    (async function fetchUser() {
      const user = await readData('user', currentUser.uid)

      setAddress(user.address)
      setDataUser(user)

      setUser({
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL || icons.defaultAvatar,
        email: user.email
      })
    })()
  }, [currentUser, setDataUser])

  return (
    <section className="w-full lg:w-3/4 xl:w-2/3 flex flex-col gap-6 mt-8 px-6 sm:pl-12 md:pl-72 py-2 transition-transform">
      <div className="flex items-center gap-4 mb-6">
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

      <Address address={address} setAddress={setAddress} />

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
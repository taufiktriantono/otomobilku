import Label from "@/Components/Label";
import Layout from "@/Layouts/Main";
import { Head, useForm } from "@inertiajs/inertia-react";
import { useCallback, useEffect, useState } from "react";

export default function ListRequest(props) {

  const [isLoading, setIsLoading] = useState(true);
  const [isBrandSelected, setIsBrandSelected] = useState('');
  const [isModelSelected, setIsModelSelected] = useState('');
  const { data, setData, post } = useForm()

  const [brands, setListBrands] = useState([]);
  const fetchListBrand = useCallback(async () => {
      let response = await fetch('/api/brands')
      response = await response.json()
      setListBrands(response)

      const brand = response[0]
      setIsBrandSelected(response[0].id)
      setListModels(brand.models)
      setIsModelSelected(brand.models[0].id)
      setSelectedModel(brand.models[0].name)
      // await fetchListModel(response[0].id)
  }, [])

  const [selectedModel, setSelectedModel] = useState('')
  const [models, setListModels] = useState([]);
  const fetchListModel = useCallback(async (brandId) => {
      let response = await fetch(`/api/brands/${brandId}/models`)
      response = await response.json()
      setListModels(response)
      setSelectedModel(response[0].id)
  }, [])

  const [selectedFuel, setSelectedFuel] = useState('')
  const [fuels, setFuels] = useState(null);
  const fetchListFuel = useCallback(async () => {
      let response = await fetch('/api/fuels')
      response = await response.json()
      setFuels(response)
      setSelectedFuel(response[0].name)
      // setFuel(response[0].id)
  }, [])

  const [selectedTransmission, setSelectedTransmission] = useState('')
  const [transmissions, setTransmissions] = useState([]);
  const fetchListTransmission = useCallback(async () => {
      let response = await fetch('/api/transmissions')
      response = await response.json()
      setTransmissions(response)
      setSelectedTransmission(response[0].transmission_name)
      // setTransmission(response[0].id)
  }, [])

  const handleChangeBrand = async (e) => {
    setIsBrandSelected(e.target.value)
    const b = brands.find((v) => v.id == e.target.value)
    setListModels(b.models)
    console.log(b.models[0].id)
    setIsModelSelected(b.models[0].id)
    // let response = await fetch(`/api/brands/${b.id}/models`)
    // response = await response.json()
    // setListModels(response)
  }

  const handleChangeModel = (e) => {
    setSelectedModel(e.target.value)
    const m = models.find((v) => v.name == e.target.value)
    setIsModelSelected(m.id)
  }

  const handleChangeTransmission = (e) => {
    setSelectedTransmission(e.target.value)
    const t = transmissions.find((v) => v.transmission_name == e.target.value)
    setTransmission(t.id);
  }

  useEffect(() => {
    Promise.all([
      fetchListBrand(),
      fetchListTransmission(),
      fetchListFuel()
    ])
    .catch(err => console.log(err))
    .finally(() => setIsLoading(!isLoading))
  }, [fetchListBrand]);

  const submit = (e) => {

  }

  return (
    <Layout>
      <Head title='Situs Jual Beli Mobil Online' />
      <div className="m-auto w-2/5">
        <div className="space-y-4">
          <div className="text-xl text-center font-bold">
            Proses permintaan cek harga jual satu kali saja,
            biar Kami yang bantu cari harga terbaiknya.
          </div>
          <div className="text-sm text-center">
            otomobilku akan melakukan komparasi ke berbagai platform yang menawarkan jual mobil cepat,
            selanjutnya tim kami akan memberikan daftar harga jual yang ditawarkan dari masing-masing platform.
          </div>
          {
            isLoading ? (
              <div className='flex justify-center'>
                  <svg role="status" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
              </div>
            ) : (
              <div className="border border-gray-400 mx-8 m-auto py-6">
                <form className="space-y-4">
                    <div className="text-center text-2xl font-bold py-4">Masukan Jenis mobil Anda</div>
                    <div className="mx-8">
                        <Label value={"Merk Mobil"} />
                        <select className='w-full rounded' name='merk' value={isBrandSelected} onChange={handleChangeBrand} required>
                          {
                            brands.map((brand, i) => {
                              return (
                                <option key={brand.id} id={brand.id} value={brand.id}>{brand.name}</option>
                              )
                            })
                          }
                        </select>
                    </div>
                    <div className="mx-8">
                        <Label value={"Model Mobil"} />
                        <select className='w-full rounded' name='model' value={selectedModel} onChange={handleChangeModel} required>
                          {
                            brands.filter((b) => b.id == isBrandSelected)[0].models.map((model, i) => {
                              return (
                                <option key={model.id} id={model.id} value={model.name}>{model.name}</option>
                              )
                            })
                          }
                        </select>
                    </div>
                    <div className="mx-8">
                        <Label value={"Variant Mobil"} />
                        <select className='w-full rounded' name='variant' required={models.filter((m) => m.id == isModelSelected)[0].variants.length > 0}>
                        {
                          models.filter((m) => m.id == isModelSelected)[0].variants.map((variant) => {
                            return (
                              <option key={variant.id} id={variant.id} value={variant.id}>{variant.name}</option>
                            )
                          })
                        }
                        </select>
                    </div>
                    <div className="mx-8">
                        <Label value={"Tahun"} />
                        <input className='w-full rounded' type={'number'} name='build_year' placeholder='2015' required/>
                    </div>
                    <div className="mx-8">
                        <Label value={"Transmisi"} />
                        <select className='w-full rounded' name='transmisi' value={selectedTransmission} onChange={handleChangeTransmission} required>
                        {
                          transmissions.map((transmission) => {
                            return (
                              <option key={transmission.id} id={transmission.id} value={transmission.transmission_name}>{transmission.transmission_name}</option>
                            )
                          })
                        }
                        </select>
                    </div>
                    <div className="mx-8">
                        <Label value={"Nomor Handphone"} />
                        <input className='w-full rounded' type={'number'} name='build_year' required/>
                    </div>
                    <div className="w-2/3 m-auto text-center text-sm">
                      Nomor handphone Anda akan dihubungi oleh tim kami untuk memberikan informasi terkait harga jual.
                    </div>
                    <div className="flex justify-center">
                      <button type='submit' className='w-20 p-2 bg-indigo-700 font-bold rounded text-white'>
                        Proses
                      </button>
                    </div>
                  </form>
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  )
}
import Label from "@/Components/Label";
import Layout from "@/Layouts/Main";
import { Head } from "@inertiajs/inertia-react";
import { useCallback, useEffect, useState } from "react";

export default function ListRequest(props) {

  const [isLoading, setIsLoading] = useState(true);
  const [isBrandSelected, setIsBrandSelected] = useState('');
  const [isModelSelected, setIsModelSelected] = useState('');

  const [brands, setListBrands] = useState([]);
  const fetchListBrand = useCallback(async () => {
      let response = await fetch('/api/brands')
      response = await response.json()
      setListBrands(response)
      await fetchListModel(response[0].id)
  }, [])

  const [models, setListModels] = useState([]);
  const fetchListModel = useCallback(async (brandId) => {
      let response = await fetch(`/api/brands/${brandId}/models`)
      response = await response.json()
      setListModels(response)
      setSelectedModel(response[0].id)
  }, [])


  const [variant, setVariant] = useState([])
  const fetchListVariant = useCallback( async (id) => {
    let response = await fetch('/api/')
  }, [])

  const [selectedFuel, setSelectedFuel] = useState('')
  const [fuels, setFuels] = useState(null);
  const fetchListFuel = useCallback(async () => {
      let response = await fetch('/api/fuels')
      response = await response.json()
      setFuels(response)
      setSelectedFuel(response[0].name)
      setFuel(response[0].id)
  }, [])

  const [selectedTransmission, setSelectedTransmission] = useState('')
  const [transmissions, setTransmissions] = useState([]);
  const fetchListTransmission = useCallback(async () => {
      let response = await fetch('/api/transmissions')
      response = await response.json()
      setTransmissions(response)
      setSelectedTransmission(response[0].transmission_name)
      setTransmission(response[0].id)
  }, [])

  const handleChangeBrand = async (e) => {
    setIsBrandSelected(e.target.value)
    const b = brands.find((v) => v.name == e.target.value)
    let response = await fetch(`/api/brands/${b.id}/models`)
    response = await response.json()
    setListModels(response)
  }

  const handleChangeModel = (e) => {
    setIsModelSelected(e.target.value)
    const m = models.find((v) => v.name == e.target.value)
    setSelectedModel(m.id)
  }

  const handleChangeTransmission = (e) => {
    setTransmission(e.target.value)
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
    .finally(() => setIsLoading(false))
  }, [fetchListBrand]);

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
          <div className="border border-gray-400 mx-8 m-auto py-6">
            <form className="space-y-4">
              <div className="text-center text-2xl font-bold py-4">Masukan Jenis mobil Anda</div>
              <div className="mx-8">
                  <Label value={"Merk Mobil"} />
                  <select className='w-full rounded' name='merk' value={isBrandSelected} onChange={handleChangeBrand} required>
                    {
                      brands.map((brand, i) => {
                        return (
                          <option key={brand.id} id={brand.id} value={brand.name}>{brand.name}</option>
                        )
                      })
                    }
                  </select>
              </div>
              <div className="mx-8">
                  <Label value={"Model Mobil"} />
                  <select className='w-full rounded' name='model' value={isModelSelected} onChange={handleChangeModel} required>
                    {
                      models.map((model, i) => {
                        return (
                          <option key={model.id} id={model.id} value={model.name}>{model.name}</option>
                        )
                      })
                    }
                  </select>
              </div>
              <div className="mx-8">
                  <Label value={"Variant Mobil"} />
                  <input className='w-full rounded' type={'text'} name='variant' required/>
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
        </div>
      </div>
    </Layout>
  )
}
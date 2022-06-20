import Label from "@/Components/Label";
import { Head, useForm } from "@inertiajs/inertia-react";
import { useCallback, useEffect, useState } from "react";
import Dashboard from "../Dashboard";

export default function ListModels(props) {

  const [isBrandSelected, setIsBrandSelected] = useState('');
  const { data, setData, get } = useForm(props.models)
  const [query, setQuery] = useState({
    page: 1,
    limit: 20,
    brand_id: ''
  })

  const handleChange = (e) => {
    setQuery((prev) => {
      return {
          ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  
  const handleChangeBrand = async (e) => {
    setIsBrandSelected(e.target.value)
  }

  const [brands, setListBrands] = useState([]);
  const fetchListBrand = useCallback(async () => {
      let response = await fetch('/api/brands')
      response = await response.json()
      setListBrands(response)
  }, [])

  const search = () => {
    get(route('setting-model'));
  }

  useEffect( async () => {
    await fetchListBrand()
  }, [])

  return (
    <Dashboard auth={props.auth} header={props.header} errors={props.errors}>
      <Head title="Daftar Model Mobil" />
      <div className='w-full flex justify-between'>
          <div className='text-lg text-gray-700 font-bold'>Daftar Model Mobil</div>
      </div>
      <div className='w-full mt-4 flex text-gray-700'>
        <div className='text-md text-gray-700 font-bold'>Filter</div>
      </div>
      <div className='w-full mt-4 flex justify-between text-gray-700 space-x-2'>
        <div>
            <Label value={'Brand'} className="mb-2" />
            <select className='w-full rounded' name='merk' value={isBrandSelected} onChange={handleChangeBrand}>
              {
                brands.map((brand, i) => {
                  return (
                    <option key={brand.id} id={brand.id} value={brand.name}>{brand.name}</option>
                  )
                })
              }
            </select>
        </div>
        <div className="flex">
          <button type={'button'} className={'py-2 px-4 self-end bg-indigo-700 rounded-md text-white'} onClick={search}>
            Search
          </button>
        </div>
      </div>
      <table className="table-auto mt-4 text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">No</th>
            <th scope="col" className="px-6 py-3">Nama</th>
            <th scope="col" className="px-6 py-3">Variant</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((model, i) => {
              return (
                <tr key={model.id} className="bg-white border-b">
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">{model.name}</td>
                  <td className="px-6 py-4">-</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </Dashboard>
  )

}
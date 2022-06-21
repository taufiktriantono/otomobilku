import Label from "@/Components/Label";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { Head, useForm } from "@inertiajs/inertia-react";
import { useCallback, useEffect, useState } from "react";
import Dashboard from "../Dashboard";

export default function ListBrand(props) {

  const { current_page, per_page } = props.brands

  const {brand, setBrand} = useState('')
  const { data, setData, get } = useForm({
    page: current_page,
    limit: per_page,
    brand_id: ''
  })

  const handleChangeBrand = async (e) => {
    setData((prev) => {
      return {
        ...prev,
        brand_id: e.target.value,
      }
    })
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

  const clear = () => {
    setData((prev) => {
      return {
        page: 1,
        brand_id: ''
      }
    })
    get(route('setting-model'));
  }

  useEffect( async () => {
    await fetchListBrand()
  }, [])

  const changePage = (pos) => {
    setData((prev) => {
      return {
        ...prev,
        page: pos,
      }
    })
  }

  const renderVariant = (data) => {
    return data.map((variant) => {
      return variant.name
    })
  }

  const linkActive = (pos) => {
    if (data.page == pos) {
        return 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
    } else {
        return 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
    }
  }

  return (
    <Dashboard auth={props.auth} header={props.header} errors={props.errors}>
      <Head title="Daftar Brand Mobil" />
      <div className='w-full flex justify-between text-gray-700 space-x-2'>
        <div className="self-center text-lg font-bold">List Brand</div>
        <div>
          <a href={route('setting-add-brand')} className={'py-2 px-4 self-end bg-indigo-700 rounded-md text-white'} >
            Add Brand
          </a>
        </div>
      </div>
      <table className="w-full mt-4 text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">Image</th>
            <th scope="col" className="px-6 py-3">Brand</th>
            <th scope="col" className="px-6 py-3">Model</th>
          </tr>
        </thead>
        <tbody>
          {
            props.brands.data.map((brand, i) => {
              return (
                <tr key={brand.id} className="bg-white border-b">
                  <td className="px-6 py-4">
                    -
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold">
                      <a href={route('setting-show-brand', brand.id)}>
                        {brand.name}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {brand.models.length} Model
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
            <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
            Previous
            </a>
            <a
                href="#"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
            Next
            </a>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{props.brands.from != null ? props.brands.from : 0}</span> to <span className="font-medium">{props.brands.to != null ? props.brands.to : 0}</span> of{' '}
                  <span className="font-medium">{props.brands.total}</span> results
                </p>
            </div>
            <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    {
                        props.brands.links.map((link, i) => {
                            if (i == 0) {
                                return (
                                    <a
                                        key={i}
                                        href={props.brands.prev_page_url}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                )
                            } else if (props.brands.links.length === i+1) {
                                return (
                                    <a
                                        key={i}
                                        href={props.brands.next_page_url}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                                    >
                                    <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                )
                            } else {
                                return (
                                    <a
                                      key={i}
                                      href={link.url}
                                    >
                                      <span key={i} onClick={() => changePage(link.label)} aria-current="page" className={linkActive(i)}>{link.label}</span>
                                    </a>
                                )
                            }
                        })
                    }
                </nav>
            </div>
        </div>
      </div>
    </Dashboard>
  )

}
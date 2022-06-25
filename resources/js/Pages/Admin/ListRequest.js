import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { Inertia } from "@inertiajs/inertia"
import { Head, useForm } from "@inertiajs/inertia-react"
import { useState } from "react"
import { months } from '../../utils'
import Dashboard from "./Dashboard"

export default function ListRequests(props) {

  const { auth, products } = props
  const { current_page, per_page } = products
  console.log(products)
  const params = new URLSearchParams()
  const [query, setQuery] = useState({
    page: current_page,
    limit: per_page,
    created_at: '',
    phone_number: '',
    q: '',
  })

  const { data, setData, get, put, processing } = useForm()

  params.set('page', query.page)
  params.set('limit', query.limit)

  const formatDate = (value) => {
      const d = new Date(value)
      const day = d.getDate()
      const month = d.getMonth()
      const year = d.getFullYear()
      const hour = d.getHours()
      const minute = d.getMinutes()
      const second = d.getSeconds()
      return `${day} ${months[month]} ${year} ${hour}:${minute}:${second}`
  }

  const handleChange = (e) => {
    setData((prev) => {
      return {
          ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const changePage = (pos) => {
    setData((prev) => {
      return {
        ...prev,
        page: pos,
      }
    })
  }

  const linkActive = (pos) => {
    if (data.page == pos) {
        return 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
    } else {
        return 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
    }
  }

  const loading = () => (
      <tr className=''>
          <th colSpan={9} className='py-4'>
              <div className='flex justify-center'>
                  <svg role="status" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
              </div>
          </th>
      </tr>
  )

  const search = () => {
    get(route('list-permintaan'));
  }

  const submit = (i) => {
    const product = products.data[i]
    product.verified = !product.verified
    setData((prev) => {
      return {
        ...prev,
        ...product
      }
    })

    put(route('update-permintaan', product.id));
  }

  return (
    <Dashboard auth={props.auth} header={props.header} errors={props.errors}>
      <Head title="Daftar Permintaan" />
      <div className='w-full flex justify-between'>
          <div className='text-lg text-gray-700 font-bold'>Permintaan Jual Mobil</div>
      </div>
      <div className='w-full mt-4 flex text-gray-700'>
        <div className='text-md text-gray-700 font-bold'>Filter</div>
      </div>
      <div className='w-full mt-4 flex text-gray-700 space-x-2'>
        <div>
            <label className="mb-2">Request Date</label>
            <input className='rounded border-gray-400' type={'date'} name='created_at' value={query.created_at} onChange={handleChange} />
        </div>
        <div>
            <label className="mb-2">Nomor Handphone</label>
            <input className='rounded border-gray-400' type={'text'} name='phone_number' value={query.phone_number} onChange={handleChange} placeholder='Nomor Handphone'/>
        </div>
        <div className='w-full ml-4'>
            <label className="mb-2">Search</label>
            <input className='w-full rounded border-gray-400' type={'search'} name='search' value={query.search} onChange={handleChange} placeholder='Merk Mobil/Model Mobil/Tahun'/>
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
              <th scope="col" className="sticky px-6 py-3">
                Request ID
              </th>
              <th scope="col" className="px-6 py-3">
                Request Date
              </th>
              <th scope="col" className="px-6 py-3">
                Merk Mobil
              </th>
              <th scope="col" className="px-6 py-3">
                Model Mobil
              </th>
              <th scope="col" className="px-6 py-3">
                Varian Mobil
              </th>
              <th scope="col" className="px-6 py-3">
                Tahun
              </th>
              <th scope="col" className="px-6 py-3">
                Transmisi
              </th>
              <th scope="col" className="px-6 py-3">
                Nomor Handphone
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.data.map((product, i) => {
              console.log(product.variants.filter((v => v.variant.is_master = true)))
                  return (
                      <tr key={product.id} className="bg-white border-b">
                          <td className="px-6 py-4">{product.id}</td>
                          <td className="px-6 -y-4">{formatDate(product.created_at)}</td>
                          <td className="px-6 -y-4">{product.models.brand.name}</td>
                          <td className="px-6 -y-4">{product.models.name}</td>
                          <td className="px-6 -y-4">{product.variants.filter((v => v.variant.is_master = true))[0] != undefined ? product.variants.filter((v => v.variant.is_master = true))[0].variant.name : '-'}</td>
                          <td className="px-6 -y-4">{product.build_year}</td>
                          <td className="px-6 -y-4">{product.transmission.transmission_name}</td>
                          <td className="px-6 -y-4">
                            <a
                              href={`https://wa.me/${product.owner.phone_number.replace('0', '62')}`}
                              target={'_blank'}
                            >
                              {product.owner.phone_number.replace('0', '62')}
                            </a>
                          </td>
                          <td className="px-6 -y-4">
                            <form onSubmit={() => submit(product)}>
                              <button type={'button'} className={'py-2 px-4 self-end bg-indigo-700 rounded-md text-white disabled:bg-gray-400'} disabled={products.data[i].verified} onClick={() => submit(i)}>
                                {
                                  products.data[i].verified ? 'Inactive' : 'Hubungi'
                                }
                              </button>
                            </form>
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
                  Showing <span className="font-medium">{products.from != null ? products.from : 0}</span> to <span className="font-medium">{products.to != null ? products.to : 0}</span> of{' '}
                  <span className="font-medium">{products.total}</span> results
                </p>
            </div>
            <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    {
                        products.links.map((link, i) => {
                            if (i == 0) {
                                return (
                                    <a
                                        key={i}
                                        href={products.prev_page_url}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                )
                            } else if (products.links.length === i+1) {
                                return (
                                    <a
                                        key={i}
                                        href={products.next_page_url}
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
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Listbox, Popover, Transition } from '@headlessui/react'
import {
  XIcon,
  SearchIcon,
  CheckIcon
} from '@heroicons/react/outline'
import { Link, useForm } from '@inertiajs/inertia-react'
import ApplicationLogo from '@/Components/ApplicationLogo'

const params = new URLSearchParams()

export default function Layout(props) {
  const { q } = props
  const { get } = useForm()
  const [products, setProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [keyword, setKeyword] = useState(q ? q : '')
  const [selected, setSelected] = useState(null)

  params.delete('page')
  params.delete('limit')
  params.delete('is_active')

  params.append('page', 1)
  params.append('limit', 5)
  params.append('is_active', true)

  const handleOnChange = e => {
    const value = e.target.value;
    params.delete('q')
    params.append('q', value)
    setKeyword(value)
    fetchListProducts(params)
  }

  const fetchListProducts = useCallback(async (param) => {
      let response = await fetch(`/api/products?${param.toString()}`)
      response = await response.json()
      setProducts(response)
      setIsLoading(false)
      setIsShow(true)
  }, [])

  const loading = () => (
    <div className='flex justify-center'>
        <svg role="status" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
    </div>
  )

  const submit = (e) => {
      e.preventDefault();

      get(route('list.product', {q: keyword}));
  };

  return (
    <>
        <Popover className="relative bg-white">
            <div className="mx-auto px-4">
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                  <div className="flex justify-start lg:w-0 lg:flex-1">
                      <Link href="/">
                        <ApplicationLogo className="h-12 w-auto sm:h-10"/>
                      </Link>
                      <div className="group relative mt-1">
                          <form onSubmit={submit} className="flex justify-center ml-10 border rounded-md">
                            <input
                              type='search'
                              className='w-80 border-none justify-start block'
                              name='name'
                              placeholder='Temukan mobil'
                              value={keyword}
                              autoComplete={'off'}
                              onChange={handleOnChange}
                            />
                            <button className='p-2' type={'submit'}>
                              <SearchIcon className=' w-6 h-6'/>
                            </button>
                          </form>
                          <div>
                            <Transition
                              show={isShow}
                              enter="transition-opacity duration-75"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition-opacity duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              {isShow && keyword != '' ? (
                                <>
                                <div className="absolute z-10 w-11/12 py-1 mt-1 ml-10 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  <div className='px-4 text-sm font-bold'>Tersedia {products.total} koleksi mobil sesuai pencarian anda</div>
                                  {
                                    products?.data?.map((product, i) => {
                                      return (
                                        <div
                                          key={i}
                                          className={`cursor-default select-none relative py-2 pl-4 pr-4 text-gray-900 hover:bg-gray-100`}
                                          value={product}
                                        >
                                          <a className='block' href={route('show:product', {slug: product.slug})}>
                                            <div className='flex'>
                                              <img className='w-10 h-10 object-cover mr-4' src={`http://otomobilku.id/storage/${product?.images.length > 0 ? product?.images[0].path : ''}`} />
                                              <span className='block truncate font-normal'>{product.name}</span>
                                            </div>
                                          </a>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                </>
                              ) : null}
                            </Transition>
                          </div>
                        </div>
                  </div>
                  <div className='flex'>
                      <a href={route('home')}>Beli Mobil Bekas</a>
                      <a href={'#'}  className='ml-6'>Jual Mobil</a>
                      <a href={'#'} className='ml-6'>News & Update</a>
                  </div>
                </div>
            </div>
            <Transition
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="pt-5 pb-6 px-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                          alt="Workflow"
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" onClick={() => setIsShow(false)} />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="mt-6">
                      {/* <nav className="grid gap-y-8">
                        {solutions.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                          >
                            <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                            <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                          </a>
                        ))}
                      </nav> */}
                    </div>
                  </div>
                  <div className="py-6 px-5 space-y-6">
                    {/* <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                        Pricing
                      </a>

                      <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                        Docs
                      </a>
                      {resources.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-base font-medium text-gray-900 hover:text-gray-700"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div> */}
                    <div>
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Sign up
                      </a>
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        Existing customer?{' '}
                        <a href="#" className="text-indigo-600 hover:text-indigo-500">
                          Sign in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
        </Popover>
        <main className='p-4 sm:p-4'>
          {props.children}
        </main>
    </>
  )
}

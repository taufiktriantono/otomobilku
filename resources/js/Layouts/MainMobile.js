import { useCallback, useState } from "react"
import {
  XIcon,
  SearchIcon,
  CheckIcon
} from '@heroicons/react/outline'
import ApplicationLogo from "@/Components/ApplicationLogo"
import { Link, useForm } from "@inertiajs/inertia-react"
import { Transition } from "@headlessui/react"

const params = new URLSearchParams()

export default function Mobile(props) {
  const { q, hide, search = true, children } = props

  const { get } = useForm()
  const [keyword, setKeyword] = useState(q ? q : '')
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null)
  const [isShow, setIsShow] = useState(false);

  const fetchListProducts = useCallback(async (param) => {
      let response = await fetch(`/api/products?${param.toString()}`)
      response = await response.json()
      setProducts(response)
      setIsLoading(false)
      setIsShow(true)
  }, [])

  const handleOnChange = e => {
    const value = e.target.value;
    params.delete('q')
    params.append('q', value)
    setKeyword(value)
    fetchListProducts(params)
  }

  const submit = (e) => {
    e.preventDefault();

    get(route('list.product', {q: keyword}));
  };

  const handleOnClick = (e) => {
    setIsShow(true)
  }

  return (
    <>
      <div className="m-auto h-screen">
        <div className={`p-4`}>
          <div className="flex justify-center">
            <Link href="/">
              <ApplicationLogo className="h-8 w-auto sm:h-10" src='http://otomobilku.id/storage/images/otomobilku_fix.png' />
            </Link>
          </div>
          {
            search ? (
              <form onSubmit={submit} className="w-full flex justify-center m-auto mt-4 border rounded-md">
                <input
                  type='search'
                  className='w-11/12 border-none justify-start block'
                  name='name'
                  placeholder='Temukan mobil'
                  autoComplete={'off'}
                  onClick={handleOnClick}
                />
                <button className='p-2' type={'submit'} disabled>
                  <SearchIcon className=' w-6 h-6'/>
                </button>
              </form>
            ) : null
          }
        </div>
        <main className="relative w-full">
          {children}
        </main>
      </div>
      <Transition
        show={isShow}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-screen h-screen absolute z-10 bottom-0 bg-white p-4">
          <div onClick={() => setIsShow(!isShow)} className="flex justify-between">
            <Link href="/">
              <ApplicationLogo className="h-8 w-auto sm:h-10"/>
            </Link>
            <div className="">
              <XIcon className="h-8 w-8" aria-hidden="true" onClick={() => setIsShow(false)} />
            </div>
          </div>
          <form onSubmit={submit} className="w-full flex justify-center m-auto mt-4 border rounded-md">
            <input
              type='search'
              className='w-11/12 border-none justify-start block'
              name='name'
              placeholder='Temukan mobil'
              autoComplete={'off'}
              value={keyword}
              onChange={handleOnChange}
            />
            <button className='p-2' type={'submit'} disabled>
              <SearchIcon className=' w-6 h-6'/>
            </button>
          </form>
          <div className="mt-2">
            {
              keyword ? (
                <>
                  {
                    products?.data?.map((product, i) => {
                      return (
                        <div
                          key={i}
                          className={`mt-2 cursor-default select-none relative py-2 text-gray-900 hover:bg-gray-100`}
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
                </>
              ) : null
            }
          </div>
        </div>
      </Transition>
    </>
  )

}
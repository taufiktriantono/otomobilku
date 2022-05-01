import Layout from '@/Layouts/Main'

import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { useCallback, useEffect, useState } from 'react'
import { Head, useForm } from '@inertiajs/inertia-react';
import { months } from '@/utils';
import Mobile from '@/Layouts/MainMobile';

const params = new URLSearchParams()

export default function ListProduct(props) {

  const { cs_phone, keyword } = props
  const [filtering, setFiltering] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProduct, setLoadProduct] = useState(false);
  const sorts = [
    {
      name: 'Tanggal Diterbitkan',
      value: 'desc-created_at'
    },
    {
      name: 'Jarak: Terendah',
      value: 'asc-distance'
    },
    {
      name: 'Jarak: Tertinggi',
      value: 'desc-distance'
    },
    {
      name: 'Harga: Terendah',
      value: 'asc-price'
    },
    {
      name: 'Harga: Tertinggi',
      value: 'desc-price'
    },
    {
      name: 'Produksi: Terbaru',
      value: 'desc-build_year'
    },
    {
      name: 'Produksi: Terlama',
      value: 'asc-build_year'
    }
  ]

  const [value, setValue] = useState({
    page: 1,
    limit: 20
  })

  params.delete('page')
  params.delete('limit')
  params.delete('is_active')
  params.delete('sort')
  params.delete('q')
  params.append('q', keyword ? keyword : '')
  params.append('is_active', true)
  params.append('page', value.page)
  params.append('limit', value.limit)
  params.append('sort', 'desc-created_at')

  const [sort, setSort] = useState('')
  const [location, setLocation] = useState([])
  const [brand, setBrand] = useState([])
  const [model, setModel] = useState([])
  const [selectedBodyType, setSelectedBodyType] = useState([])
  const [buildYear, setBuildYear] = useState({
    min_build_year: '',
    max_build_year: ''
  })

  const [price, setPrice] = useState({
    min_price: '',
    max_price: ''
  })

  const handleSortChange = (e) => {
    setSort(e.target.value)
    const s = sorts.find((v) => v.name === e.target.value)
    params.delete('sort')
    params.append('sort', s.value)
    setLoadProduct(true)
    fetchListProducts(params)
  }

  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }

  const formatDate = (value) => {
    const d = new Date(value)
    const day = d.getDate()
    const month = d.getMonth()
    const year = d.getFullYear()
    return `${day} ${months[month]}`
  }

  const [products, setProducts] = useState({
      links: [],
      data: [],
      from: 0,
      to: 0,
      total: 0,
  });

  const fetchListProducts = useCallback(async (param) => {
      let response = await fetch(`/api/products?${param.toString()}`)
      response = await response.json()
      setProducts(response)
      setLoadProduct(false)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
  }, [setProducts])

  const [brands, setListBrands] = useState([]);
  const fetchListBrand = useCallback(async () => {
      let response = await fetch('/api/brands')
      response = await response.json()
      setBrandCheckedState(new Array(response.length).fill(false))
      setListBrands(response)
  }, [])

  const [checkedBrandState, setBrandCheckedState] = useState(
    new Array(brands.length).fill(false)
  );

  const handleOnChangeBrand = (position) => {
    const updatedCheckedState = checkedBrandState.map((item, index) =>
      index === position ? !item : item
    );

    brands.map((item, index) => {
      if (index === position) {
        const indexed = brand.indexOf(item.id)
        if (indexed != -1) {
          params.delete(`brand_ids[${index}]`)
          brand.splice(indexed, 1)
        } else {
          brand.push(item.id)
          params.append(`brand_ids[${index}]`, item.id)
          
        }
      }
    })

    setBrandCheckedState(updatedCheckedState);
    fetchListModel(params)
    setLoadProduct(true)
    fetchListProducts(params)
  };

  const [models, setListModels] = useState([]);
  const fetchListModel = useCallback(async (param) => {
      let response = await fetch(`/api/models?${param.toString()}`)
      response = await response.json()
      setListModels(response)
  }, [])

  const [checkedModelState, setModelCheckedState] = useState(
    new Array(models.length).fill(false)
  );

  const handleOnChangeModel = (position) => {
    const updatedCheckedState = checkedModelState.map((item, index) =>
      index === position ? !item : item
    );

    models.map((item, index) => {
      if (index === position) {
        const indexed = model.indexOf(item.id)
        if (indexed != -1) {
          params.delete(`models_ids[${index}]`)
          deleteBrand(item.brand_id)
          model.splice(indexed, 1)
        } else {
          model.push(item.id)
          selectedBrand(item.brand_id)
          params.append(`models_ids[${index}]`, item.id)
        }
      }
    })

    setModelCheckedState(updatedCheckedState);
    setLoadProduct(true)
    fetchListProducts(params)
  };

  const deleteBrand = (brandId) => {
    const position = brands.findIndex((v) => {
      return v.id == brandId
    });

    // const updatedCheckedState = checkedBrandState.map((item, index) =>
    //   index === position ? !item : item
    // );

    params.delete(`brand_ids[${position}]`)

    // setBrandCheckedState(updatedCheckedState);
    fetchListModel(params)
  }

  const selectedBrand = (brandId) => {
    // const position = brands.findIndex((v) => {
    //   return v.id == brandId
    // });

    // const updatedCheckedState = checkedBrandState.map((item, index) =>
    //   index === position ? !item : item
    // );

    // params.append(`brand_ids[${position}]`, brandId)

    // setBrandCheckedState(updatedCheckedState);
    fetchListModel(params)
  }

  const [district, setDistrict] = useState([]);
  const fetchListDistrict = useCallback(async () => {
      let response = await fetch(`/api/districts`)
      response = await response.json()
      setDistrict(response);
  }, [])

  const [cities, setCities] = useState([]);
  const fetchListCity = useCallback(async () => {
      let response = await fetch('/api/cities')
      response = await response.json()
      setCities(response);
  }, [])

  const [bodyTypes, setBodyTypes] = useState([]);
  const fetchListBodyType = useCallback(async (param) => {
      let response = await fetch(`/api/bodyTypes?${param.toString()}`)
      response = await response.json()
      setBodyTypes(response)
  }, [])

  const [checkedBodyTypeState, setBodyTypeCheckedState] = useState(
    new Array(bodyTypes.length).fill(false)
  );

  const handleOnChangeBodyType = (position) => {
    const updatedCheckedState = checkedBodyTypeState.map((item, index) =>
      index === position ? !item : item
    );

    bodyTypes.map((item, index) => {
      if (index === position) {

        const indexed = selectedBodyType.indexOf(item.id)
        if (indexed != -1) {
          params.delete(`body_types_ids[${index}]`)
          selectedBodyType.splice(indexed, 1)
        } else {
          selectedBodyType.push(item.id)
          params.append(`body_types_ids[${index}]`, item.id)
        }
      }
    })

    setBodyTypeCheckedState(updatedCheckedState);
    fetchListProducts(params)
  };

  const [checkedLocationState, setLocationCheckedState] = useState(
    new Array(cities.length).fill(false)
  );

  const handleOnChangeLocation = (position) => {
    const updatedCheckedState = checkedLocationState.map((item, index) =>
      index === position ? !item : item
    );

    filtering.push({
      name: 'location',
      value: cities[position],
      label: cities[position].city_name
    })

    cities.map((item, index) => {
      if (index === position) {
        
        const indexed = location.indexOf(item.city_id)
        if (indexed != -1) {
          params.delete(`city_ids[${index}]`)
          location.splice(indexed, 1)
        } else {
          location.push(item.city_id)
          params.append(`city_ids[${index}]`, item.city_id)
        }
      }
    })

    setLocationCheckedState(updatedCheckedState);
    setLoadProduct(true)
    fetchListProducts(params)
  };

  const handleChangeBuildYear = (e) => {
    const value = e.target.value
    const key = e.target.name
    setBuildYear((prevState) => {
      return {
        ...prevState,
        [key]: value
      }
    })
  }

  const handleSubmitBuildYear = (e) => {
    e.preventDefault()
    params.delete('min_build_year')
    params.delete('max_build_year')
    params.append('min_build_year', buildYear.min_build_year)
    params.append('max_build_year', buildYear.max_build_year)
    setLoadProduct(true)
    fetchListProducts(params)
  }

  const handleChangePrice = (e) => {
    const value = e.target.value
    const key = e.target.name
    setPrice((prevState) => {
      return {
        ...prevState,
        [key]: value
      }
    })
    setClearPriceShow(true)
  }

  const [clearPriceShow, setClearPriceShow] = useState(false)
  const handleSubmitPrice = (e) => {
    e.preventDefault()
    params.delete('min_price')
    params.delete('max_price')
    params.append('min_price', price.min_price)
    params.append('max_price', price.max_price)
    setPrice((prevState) => {
      return {
        ...prevState,
        min_price: '',
        max_price: ''
      }
    })
    setLoadProduct(true)
    fetchListProducts(params)
  }

  const clearFilterPrice = (e) => {
    e.preventDefault()
    params.delete('min_price')
    params.delete('max_price')
    setLoadProduct(true)
    clearPriceShow(false)
    fetchListProducts(params)
  }

  const loading = () => (
    <div className=''>
        <svg role="status" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
    </div>
  )

  const web = () => (
    <Layout q={keyword}>
        <Head title='Situs Jual Beli Mobil Online' />
        <div id='top' className='grid grid-cols-6'>
          {
            isLoading ? loading() :
            (
              <>
                <div className='mr-6'>
                  <div className=''>
                    <div className='p-4 mb-4 overflow-hidden shadow'>
                      <Disclosure defaultOpen={true}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full text-lg font-normal text-left">
                              <span>Lokasi</span>
                              <ChevronUpIcon
                                className={`${
                                  open ? 'transform rotate-180' : ''
                                } w-5 h-5`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="h-52 p-1 overflow-auto mt-4 text-sm text-gray-500">
                              <div className=''>
                                {cities.map((v, i) => {
                                  return (
                                    <div key={v.city_id} className='flex'>
                                      <input className='mb-4' id={`city-${v.city_id}`} name='city' type='checkbox' checked={checkedLocationState[i]} onChange={() => handleOnChangeLocation(i)}/>
                                      <div className='ml-2'>{v.city_name}</div>
                                    </div>
                                  )
                                })}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                    <div className='p-4 mb-4 overflow-hidden shadow'>
                      <Disclosure defaultOpen={true}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex justify-between w-full text-lg font-normal text-left">
                            <span>Merk</span>
                            <ChevronUpIcon
                              className={`${
                                open ? 'transform rotate-180' : ''
                              } w-5 h-5`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="h-52 p-1 overflow-auto mt-4 text-sm text-gray-500">
                            {brands.map((v, i) => {
                                return (
                                  <div key={v.id} className='flex'>
                                    <input className='mb-4' id={`brand-${v.id}`} name='brand' type='checkbox' checked={checkedBrandState[i]} onChange={() => handleOnChangeBrand(i)}/>
                                    <div className='ml-2'>{v.name}</div>
                                  </div>
                                )
                            })}
                          </Disclosure.Panel>
                        </>
                      )}
                      </Disclosure>
                    </div>
                    <div className='p-4 mb-4 overflow-hidden shadow'>
                      <Disclosure defaultOpen={true}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full text-lg font-normal text-left">
                              <span>Model</span>
                              <ChevronUpIcon
                                className={`${
                                  open ? 'transform rotate-180' : ''
                                } w-5 h-5`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="h-52 p-1 overflow-auto mt-4 text-sm text-gray-500">
                              {models.map((v, i) => {
                                  return (
                                    <div key={v.id} className='flex'>
                                      <input className='mb-4' id={`model-${v.id}`} name='model' type='checkbox' checked={checkedModelState[i]} onChange={() => handleOnChangeModel(i)}/>
                                      <div className='ml-2'>{v.name}</div>
                                    </div>
                                  )
                              })}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                    <div className='p-4 mb-4 overflow-hidden shadow'>
                      <Disclosure defaultOpen={true}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full text-lg font-normal text-left">
                              <span>Tahun Produksi</span>
                              <ChevronUpIcon
                                className={`${
                                  open ? 'transform rotate-180' : ''
                                } w-5 h-5`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-4 text-sm text-gray-700">
                              <div className='b-4'>
                                <input className='flex w-20 h-6 rounded-md text-sm' type={'number'} name={'min_build_year'} placeholder={2006} value={buildYear.min_build_year} onChange={handleChangeBuildYear}/>
                                <div className='my-2'>sampai</div>
                                <input className='flex w-20 h-6 rounded-md text-sm' type={'number'} name={'max_build_year'} placeholder={2020} value={buildYear.max_build_year} onChange={handleChangeBuildYear}/>
                              </div>
                              <div className='flex justify-end'>
                                <a href='#top' className='px-2 py-1 mt-4 text-white font-bold rounded-md bg-emerald-600' onClick={handleSubmitBuildYear}>Simpan</a>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                    <div className='p-4 mb-4 overflow-hidden shadow'>
                      <Disclosure defaultOpen={true}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full text-lg font-normal text-left">
                              <span>Tipe Body</span>
                              <ChevronUpIcon
                                className={`${
                                  open ? 'transform rotate-180' : ''
                                } w-5 h-5`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="h-52 p-1 overflow-auto mt-4 text-sm text-gray-500">
                              {bodyTypes.map((v, i) => {
                                  return (
                                    <div key={v.id} className='flex'>
                                      <input className='mb-4' id={`body-type-${v.id}`} name='body_type' type='checkbox' checked={checkedBodyTypeState[i]} onChange={() => handleOnChangeBodyType(i)}/>
                                      <div className='ml-2'>{v.type_name}</div>
                                    </div>
                                  )
                              })}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                    <div className='p-4 mb-4 overflow-hidden shadow'>
                      <Disclosure defaultOpen={true}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full text-lg font-normal text-left">
                              <span>Harga</span>
                              <ChevronUpIcon
                                className={`${
                                  open ? 'transform rotate-180' : ''
                                } w-5 h-5`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-4 text-sm text-gray-700">
                              <div className='mb-4'>
                                <input className='flex w-1/2 h-6 rounded-md text-sm' type={'number'} name={'min_price'} placeholder={'min'} value={price.min_price} onChange={handleChangePrice}/>
                                <div className='my-2'>sampai</div>
                                <input className='flex w-1/2 h-6 rounded-md text-sm' type={'number'} name={'max_price'} placeholder={'max'} value={price.max_price} onChange={handleChangePrice}/>
                              </div>
                              <div className='flex justify-end'>
                                {/* {
                                  clearPriceShow ? (<a href='#top' className='px-2 py-1 text-white font-bold rounded-md bg-gray-600' onClick={clearFilterPrice}>Clear</a>) : null
                                } */}
                                <a href='#top' className='px-2 py-1 ml-2 text-white font-bold rounded-md bg-emerald-600' onClick={handleSubmitPrice}>Simpan</a>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  </div>
                </div>
                <div className='w-full px-8 sm:px-0 col-span-5'>

                  {/* Urutkan */}
                  <div className='flex justify-between'>
                    <div className='font-bold italic'>Tersedia {products.total.toFixed()} Koleksi mobil di otomobilku.id</div>
                    <div className='justify-center'>
                      <span className='text-sm mr-2'>Sortir Berdasarkan</span>
                      <select className='text-sm rounded border-gray-400' value={sort} onChange={handleSortChange}>
                        {
                          sorts.map((sort) => {
                            return <option key={sort.value} name='sort' value={sort.name}>{sort.name}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>

                  {/* <div>
                    {filtering.length > 0 ? (
                      <>
                        hapus semua filter
                      </>
                    ): null}
                  </div> */}

                  {/* List Product */}
                  <div className="bg-white">
                    <div className="max-full mx-auto lg:max-w-full">
                      {
                        loadProduct ? (
                          <div className='w-full flex justify-center'>
                            {loading()}
                          </div>
                        ) : null
                      }
                      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        { !loadProduct ? products.data.map((product) => (
                          <div key={product.id} className="group relative">
                          <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none" style={{
                            height: "160px"
                          }}>
                            <img
                              src={product?.images.length > 0 ? `http://otomobilku.id/storage/${product?.images[0].path}` : ''}
                              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                            />
                          </div>
                          <div className="mt-4 flex justify-between">
                            <div className='w-full'>
                              <h3 className="text-lg text-black-600 font-bold">
                                <a href={route('show:product', {slug: product.slug})}>
                                  <span aria-hidden="true" className="absolute inset-0" />
                                  {formatRupiah(product.price)}
                                </a>
                              </h3>
                              <p className="w-full h-12 mt-1 text-md font-bold text-gray-700 text-ellipsis overflow-hidden">{product.name}</p>
                              <div className="mt-2 text-md font-bold text-gray-700">{product.build_year} - {product.distance} KM</div>
                              <div className='flex justify-between mt-1'>
                                <div className="mt-1 text-sm font-bold text-gray-700">{product?.district?.district_name ? product?.district?.district_name : '-'}</div>
                                <div className="mt-1 text-xs font-bold text-gray-700">{formatDate(product.updated_at)}</div>
                              </div>
                            </div>
                          </div>
                          <div className='mt-2 flex justify-center'>
                            <div className='w-full bg-emerald-600 mr-1 rounded'>
                              <a className='flex justify-center py-2' href={`https://wa.me/${cs_phone}?text=http://ottomobilku.id/items/${product.slug}%0ASaya%20tertarik%20dengan%20mobil%20ini`} target={'_blank'}>
                                <svg className='h-8 w-auto' fill="#ffffff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"/></svg>
                              </a>
                            </div>
                            <div className='w-full flex justify-center bg-emerald-600 ml-1 rounded'>
                              <button className='w-full'>
                                <a className='w-full text-white font-bold' href={route('show:product', {slug: product.slug})}>Detail</a>
                              </button>
                            </div>
                          </div>
                        </div>
                        )) : null }
                      </div>
                    </div>
                  </div>

                </div>
              </>
            )
          }
        </div>
    </Layout>
  )

  const mobile = () => {
    if (window.innerWidth <= 780) {
      return (
        <Mobile>
          <Head title='Situs Jual Beli Mobil Online' />
          <div className='w-full'>
            {/* <div className='flex justify-between p-4'>
              <div>Filtering</div>
              <div>Show Filtered</div>
            </div> */}
            <div className='h-screen overflow-y-auto p-4'>
              {
                loadProduct ? (
                  <div className='w-full flex justify-center'>
                    {loading()}
                  </div>
                ) : null
              }
              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2">
                { !loadProduct ? products.data.map((product) => (
                  <div key={product.id} className="group relative grid grid-cols-2 gap-2 shadow-md overflow-hidden rounded hover:bg-gray-300">
                    <div className="bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75 lg:aspect-none">
                      <img
                        src={product?.images.length > 0 ? `http://otomobilku.id/storage/${product?.images[0].path}` : ''}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                      />
                    </div>
                    <div className='p-4'>
                      <h3 className="text-lg text-black-600 font-bold">
                        <a href={route('show:product', {slug: product.slug})}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {formatRupiah(product.price)}
                        </a>
                      </h3>
                      <div className="h-14 mt-1 text-sm font-bold text-gray-700 text-ellipsis overflow-hidden whitespace-nowrap">{product.name}</div>
                      <div className="mt-2 text-md font-bold text-gray-700">{product.build_year} - {product.distance} KM</div>
                      <div className='flex justify-between mt-1'>
                        <div className="mt-1 text-sm font-bold text-gray-700">{product?.district?.district_name ? product?.district?.district_name : '-'}</div>
                        <div className="mt-1 text-xs font-bold text-gray-700">{formatDate(product.updated_at)}</div>
                      </div>
                    </div>
                  </div>
                )) : null }
              </div>
            </div>
          </div>
        </Mobile>
      )
    } else {
      return web()
    }
  }

  useEffect(() => {
      Promise.all([
          fetchListBrand(),
          fetchListModel(params),
          fetchListCity(),
          fetchListDistrict(),
          fetchListBodyType(params),
          fetchListProducts(params),
      ])
      .finally(() => setIsLoading(false))
  }, [fetchListBrand, fetchListCity, fetchListDistrict, fetchListProducts]);

  return (
    <>
      {
        mobile()
      }
    </>
  )
}

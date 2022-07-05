import React, { useCallback, useEffect, useState } from 'react';
import { Head } from '@inertiajs/inertia-react';
import ValidationErrors from '@/Components/ValidationErrors';
import AuthenticatedInspector from '@/Layouts/AuthenticatedInspector';
import axios from 'axios';

export default function AddProduct(props) {
    const { auth, errors } = props

    // if (auth.user == null) {
    //   var query = new URLSearchParams()
    //   query.set('returnUrl', route('home-inspector'))
    //   window.open(route('admin.login') + `?${query.toString()}`, '_blank')
    // }

    const [enabled, setEnabled] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    const [isBrandSelected, setIsBrandSelected] = useState('');
    const [isModelSelected, setIsModelSelected] = useState('');
    const [isDistrictSelected, setIsDistrictSelected] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [buildYear, setBuildYear] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [distance, setDistance] = useState('');
    const [fuel, setFuel] = useState('');
    const [price, setPrice] = useState('');
    const [transmission, setTransmission] = useState('');
    const [coordinate, setCoordinate] = useState('');

    const handleChangeCoordinate = (e) => {
      console.log(e.target.value)
      setCoordinate(e.target.value)
    }

    const checkPermission = () => {
      if (navigator.geolocation) {
        navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            console.log(result.state);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }

          result.onchange = function () {
            console.log(result.state);
          };
        })
      }
    }

    const [currentPosition, setCurrentPosition] = useState(null)
    const getCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCurrentPosition([position.coords.latitude, position.coords.longitude])
      });
    }

    const [brands, setListBrands] = useState(null);
    const fetchListBrand = useCallback(async () => {
        let response = await fetch('/api/brands')
        response = await response.json()
        setListBrands(response)
        await fetchListModel(response[0].id)
    }, [])

    const [selectedCity, setSelectedCity] = useState('')
    const [cities, setCities] = useState(null);
    const fetchListCity = useCallback(async () => {
        let response = await fetch('/api/cities')
        response = await response.json()
        setCities(response);
        setSelectedCity(response[0].city_id)
        await fetchListDistrict(response[0].city_id)
    }, [])

    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [district, setDistrict] = useState(null);
    const fetchListDistrict = useCallback(async (cityId) => {
        let response = await fetch(`/api/districts?city_id=${cityId}`)
        response = await response.json()
        setDistrict(response);
        setSelectedDistrict(response[0].district_name)
        setIsDistrictSelected(response[0].district_id)
    }, [])

    useEffect(() => {
      Promise.all([
        checkPermission(),
        getCurrentPosition(),
        fetchListBrand(),
        fetchListCity(),
        fetchListBodyType(),
        fetchListTransmission(),
        fetchListFuel()
      ])
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
    }, [fetchListBrand, fetchListCity]);

    const [selectedModel, setSelectedModel] = useState('')
    const [models, setListModels] = useState(null);
    const fetchListModel = useCallback(async (brandId) => {
        let response = await fetch(`/api/brands/${brandId}/models`)
        response = await response.json()
        setListModels(response)
        setSelectedModel(response[0].id)
    }, [])

    const [selectedBodyType, setSelectedBodyType] = useState('')
    const [bodyTypes, setBodyTypes] = useState(null);
    const fetchListBodyType = useCallback(async () => {
        let response = await fetch('/api/bodyTypes')
        response = await response.json()
        setBodyTypes(response)
        setSelectedBodyType(response[0].name)
        setBodyType(response[0].id)
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
    const [transmissions, setTransmissions] = useState(null);
    const fetchListTransmission = useCallback(async () => {
        let response = await fetch('/api/transmissions')
        response = await response.json()
        setTransmissions(response)
        setSelectedTransmission(response[0].transmission_name)
        setTransmission(response[0].id)
    }, [])

    const handleChangeCity = async (e) => {
      setSelectedCity(e.target.value)
      const d = cities.find((v) => v.city_name == e.target.value)
      let response = await fetch(`/api/districts?city_id=${d.city_id}`)
      response = await response.json()
      setDistrict(response)
    }

    const handleChangeDistrict = (e) => {
      setSelectedDistrict(e.target.value)
      const d = district.find((v) => v.district_name == e.target.value)
      setIsDistrictSelected(d.district_id)
    }

    const handleChangeTitle = (e) => {
      setTitle(e.target.value)
    }

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

    const handleChangeBuildYear = (e) => {
      setBuildYear(e.target.value)
    }
    
    const handleChangeBodyType = (e) => {
      setSelectedBodyType(e.target.value)
      const b = bodyTypes.find((v) => v.name === e.target.name)
      setBodyType(b.id)
    }

    const handleChangeDistance = (e) => {
      setDistance(e.target.value)
    }

    const handleChangeFuel = (e) => {
      setSelectedFuel(e.target.value)
      const f = fuels.find((v) => v.fuel_name === e.target.value)
      setFuel(f.id)
    }
  
    const handleChangeTransmission = (e) => {
      setTransmission(e.target.value)
      const t = transmissions.find((v) => v.transmission_name == e.target.value)
      setTransmission(t.id);
    }

    const handleChangeDescription = (e) => {
      setDescription(e.target.value)
    }

    const handleChangePrice = (e) => {
      setPrice(e.target.value)
    }

    const formatRupiah = (money) => {
      return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
      ).format(money);
    }

    let [fileUploaded, setFileUploaded] = useState([])
    const removeImage = (pos) => {
      const index = fileUploaded.indexOf(pos)
      if (index !== -1) {
        fileUploaded.splice(index, 1)
      }
      setFileUploaded((prevstate) => {
        return [...fileUploaded]
      })
    }

    const onFileChange = async (e) => {
      if (e.target.files != undefined) {
        const formData = new FormData()
        Array.from(e.target.files).forEach((file) => {
          formData.append('images[]', file)
        })

        let response = await fetch('/api/uploads/images', {
          method: 'post',
          body: formData
        })

        response = await response.json()
        setFileUploaded((prevstate) => {
          return [...prevstate, ...response]
        })
      }
    }

    const [fullName, setFullName] = useState('');
    const handleChangeFullName = (e) => {
      setFullName(e.target.value)
    }

    const [phoneNumber, setPhoneNumber] = useState('');
    const handleChangePhoneNumber = (e) => {
      setPhoneNumber(e.target.value)
    }

    const loading = () => (
      <div className='flex justify-center'>
          <svg role="status" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
      </div>
    )

    const [loadingSubmitted, setLoadingSubmitted] = useState(false);
    const onSubmit = (e) => {
      e.preventDefault()
      setLoadingSubmitted(true);
        axios.post('/', {
          product_sub_category_id: '547dc152-2722-46a9-8292-df3b559f94ba',
          name: title,
          description: description,
          product_model_id: selectedModel,
          product_district_id: isDistrictSelected,
          price: price,
          build_year: buildYear,
          distance: distance,
          product_body_type_id: bodyType,
          product_fuel_id: fuel,
          product_transmission_id: transmission,
          seller_id: auth.user.id,
          geo_point: coordinate,
          is_active: enabled,
          image_path: fileUploaded,
          full_name: fullName,
          phone_number: phoneNumber,
          archive: false,
          verified: true
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }).then(() => {
          setLoadingSubmitted(false)
          window.location.reload()
        })
        .catch(() => {
          setLoadingSubmitted(false)
        })
    }

    return (
        <AuthenticatedInspector auth={props.auth} header={props.header} errors={props.errors}>
            <Head title="Add Product" />
            <form onSubmit={onSubmit}>
              <div className="lg:w-3/5 w-full mx-auto relative overflow-x-auto p-6 bg-white">
                {
                  isLoading ? loading() :
                  (
                    <>
                      <div className='w-full mb-2'>
                          <div className='mb-2 text-2xl text-gray-700 font-bold'>Add Product</div>
                          <span className='text-gray-500'>Silahkan masukan informasi mobil</span>
                      </div>
                      <ValidationErrors errors={errors} />
                      <div className='w-full mb-4'>
                          <label>Judul</label>
                          <input className='w-full rounded' name='name' type={'text'} placeholder='Judul' value={title} onChange={handleChangeTitle}/>
                      </div>
                      <div className='w-full mb-4'>
                          <label>Merk</label>
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
                      <div className='w-full mb-4'>
                          <label>Model</label>
                          <select className='w-full rounded' name='model' value={isModelSelected} onChange={handleChangeModel}>
                            {
                              models.map((model, i) => {
                                return (
                                  <option key={model.id} id={model.id} value={model.name}>{model.name}</option>
                                )
                              })
                            }
                          </select>
                      </div>
                      <div className='w-full mb-4'>
                          <label>Tahun Perakitan</label>
                          <input className='w-full rounded' type={'number'} name='build_yaer' placeholder='2015' value={buildYear} onChange={handleChangeBuildYear}/>
                      </div>
                      <div className='w-full mb-4'>
                          <label>Body Mobil</label>
                          <select className='w-full rounded' name='body_type' value={selectedBodyType} onChange={handleChangeBodyType}>
                            {
                              bodyTypes.map((bodyType) => {
                                return (
                                  <option key={bodyType.id} id={bodyType.id} value={bodyType.type_name}>{bodyType.type_name}</option>
                                )
                              })
                            }
                          </select>
                      </div>
                      <div className='w-full mb-4'>
                          <div className='flex justify-between'>
                              <div className='mr-4'>
                                <label>KM</label>
                                <input className='w-full rounded' type={'number'} name='distance' placeholder='20000' value={distance} onChange={handleChangeDistance}/>
                              </div>
                              <div className='mr-4'>
                                <label>Bahan Bakar</label>
                                <select className='w-full rounded' name='fuel' value={selectedFuel} onChange={handleChangeFuel}>
                                  {
                                    fuels.map((fuel) => {
                                      return (
                                        <option key={fuel.id} id={fuel.id} value={fuel.fuel_name}>{fuel.fuel_name}</option>
                                      )
                                    })
                                  }
                                </select>
                              </div>
                              <div>
                                <label>Tranmisi</label>
                                <select className='w-full rounded' name='transmission' value={selectedTransmission} onChange={handleChangeTransmission}>
                                  {
                                    transmissions.map((transmission) => {
                                      return (
                                        <option key={transmission.id} id={transmission.id} value={transmission.transmission_name}>{transmission.transmission_name}</option>
                                      )
                                    })
                                  }
                                </select>
                              </div>
                          </div>
                      </div>
                      <div className='w-full mb-4'>
                          <label>Deskripsi</label>
                          <textarea className='w-full h-32 rounded' name='description' value={description} onChange={handleChangeDescription}></textarea>
                      </div>
                      <div className='w-full mb-4'>
                          <label>Kota</label>
                          <select className='w-full rounded' name='city' value={selectedCity} onChange={handleChangeCity}>
                            {
                              cities.map((city) => {
                                return (
                                  <option key={city.city_id} id={city.city_id} value={city.city_name}>{city.city_name}</option>
                                )
                              })
                            }
                          </select>
                      </div>
                      <div className='w-full mb-4'>
                          <label>Kecamatan</label>
                          <select className='w-full rounded' name='sub-district' value={selectedDistrict} onChange={handleChangeDistrict}>
                            {
                              district.map((district) => {
                                return (
                                  <option key={district.district_id} id={district.district_id} value={district.district_name}>{district.district_name}</option>
                                )
                              })
                            }
                          </select>
                      </div>
                      <div className='w-full mb-4'>
                          <label>Titik Kordinat</label>
                          <input className='w-full rounded' type={'text'} name='geo_point' value={coordinate} onChange={handleChangeCoordinate} />
                      </div>
                      <div className='w-full mb-4'>
                          <label>Harga Mobil (IDR)</label>
                          <input className='w-full rounded' type={'number'} name='price' placeholder='200000000' value={price} onChange={handleChangePrice}/>
                      </div>
                      <div className='w-full mb-4'>
                          <label>Unggah Foto</label>
                          <div className='w-full rounded border-2'>
                            <div className='grid grid-cols-4 gap-4'>
                              {
                                fileUploaded != null ?
                                fileUploaded.map((file, i) => {
                                  return (
                                    <div key={file.path} className='p-1 m-2 shadow-md rounded-md'>
                                      <svg onClick={() => removeImage(file)} className="w-6 h-6 absolute cursor-pointer" fill="indigo" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                      <img
                                      src={'http://admin.otomobilku.id/storage/' + file.path}
                                      className="min-h-16"
                                    />
                                    </div>
                                  )
                                }) : null
                              }
                            </div>
                            <label className="flex flex-col w-full h-auto">
                              <div className="flex flex-col items-center justify-center pt-7 h-full">
                                  <svg xmlns="http://www.w3.org/2000/svg"
                                      className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                      fill="currentColor">
                                      <path fillRule="evenodd"
                                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                          clipRule="evenodd" />
                                  </svg>
                                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                      Select a photo</p>
                              </div>
                              <input type="file" className="opacity-0" onChange={onFileChange} multiple/>
                            </label>
                          </div>
                      </div>
                      <div className='w-full mb-4'>
                        <div className='font-bold'>Data Pemilik</div>
                        <div>
                          <label>Nama Lengkap</label>
                          <input className='w-full mb-4 rounded' type={'text'} name='full_name' placeholder='Udin' value={fullName} onChange={handleChangeFullName}/>
                          <label>Nomor Telepon</label>
                          <input className='w-full mb-4 rounded' type={'text'} name='phone_number' placeholder='081299465052' value={phoneNumber} onChange={handleChangePhoneNumber}/>
                        </div>
                      </div>
                      {/* <div className='w-full mb-4'>
                        <Label>Publish</Label>
                        <Switch
                          checked={enabled}
                          onChange={setEnabled}
                          className={`${enabled ? 'bg-indigo-700' : 'bg-gray-700'}
                            relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                              pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                          />
                        </Switch>
                      </div> */}
                      <div className='flex justify-end'>
                        {/* <a href={route('dashboard')} className='w-20 p-2 bg-gray-700 font-bold rounded text-center text-white mr-4'>Back</a> */}
                        <button type='submit' className='w-20 p-2 bg-indigo-700 font-bold rounded text-white' disabled={loadingSubmitted}>
                          {
                            loadingSubmitted ?
                            (
                              <div className='flex justify-center'>
                                <svg role="status" className="w-5 h-5 text-white animate-spin fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                              </div>
                            ) : 'Save'
                          }
                        </button>
                      </div>
                    </>
                  )
                }
              </div>
            </form>
        </AuthenticatedInspector>
    );
}

import Layout from '@/Layouts/Main'
  
import { useCallback, useEffect, useState } from 'react'
import { formatDate } from '@/utils'
import { Head } from '@inertiajs/inertia-react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function DetailProduct(props) {
  const { slug, breadcrumb, cs_phone } = props
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null)

  const [selectedImage, setSelectedImage] = useState(null)
  const onClickImage = (pos) => {
    setSelectedImage(product.images[pos])
  }

  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }

  const fetchProduct = useCallback(async () => {
      let response = await fetch(`/api/products/${slug}`)
      response = await response.json()
      setSelectedImage(response?.images[0])
      setProduct(response)
  }, [])

  useEffect(() => {
    Promise.all([
      fetchProduct()
    ]).finally(() => setIsLoading(false))
  }, [fetchProduct])

  const loading = () => (
    <div className='flex justify-center'>
        <svg role="status" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
    </div>
  )

  return (
    <Layout>
        <Head title={product ? `${product?.models.brand.name} ${product?.models.name} ${product?.build_year}` : 'Detail Product'}>

          <meta property='description' content={product?.description} />

          <meta property='og:title' content={`${product?.models.brand.name} ${product?.models.name} ${product?.build_year}`} />
          <meta property='og:description' content={product?.description} />
          <meta property='og:type' content={'product'} />
          <meta property='og:site_name' content='Otomobilku' />
          <meta property='og:url' content={`http://otomobilku.id/mobil-bekas/${product?.slug}`} />
          <meta property='og:image' content={`http://otomobilku.id/storage/${product?.images[0].path}`} />

          <meta property='product:price:amount' content={product?.price} />
          <meta property='product:price:currency' content={'IDR'} />

          <meta property='twitter:card' content={'product'} />
          <meta property='twitter:site' content={'@otomobilku.com'} />
          <meta property='twitter:creator' content={'@otomobilku.com'} />
          <meta property='twitter:title' content={`${product?.models.brand.name} ${product?.models.name} ${product?.build_year}`} />
          <meta property='twitter:description' content={product?.description} />
          <meta property='twitter:image' content={`http://otomobilku.id/storage/${product?.images[0].path}`} />
          <meta property='twitter:data1' content={product?.price} />
          <meta property='twitter:label1' content={'Harga'} />

        </Head>
        <div className="bg-white">
          <div className="pt-2">
            { isLoading ? loading() :
              (
                <>
                  <nav aria-label="Breadcrumb">
                    <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                      {
                        breadcrumb.map((breadcrumb) => {
                          return (
                            <li key={breadcrumb}>
                              <div className="flex items-center">
                                <a href={'/'} className="mr-2 text-sm font-medium text-gray-900">
                                  {breadcrumb.name}
                                </a>
                                <svg
                                  width={16}
                                  height={20}
                                  viewBox="0 0 16 20"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                  className="w-4 h-5 text-gray-300"
                                >
                                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                              </div>
                            </li>
                          )
                        })
                      }
                      <li className="text-sm">
                        <a href={`http://otomobilku.id/mobil-bekas/${product.slug}`} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                          {product.name}
                        </a>
                      </li>
                    </ol>
                  </nav>

                  <div className='max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8'>
                    <div className="lg:col-span-2  lg:border-gray-200 lg:pr-8">
                      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:row-span-3">
                      <p className="text-3xl text-gray-900 lg:text-right md:text-left">{formatRupiah(product.price)}</p>
                      <p className='text-sm lg:text-right md:text-left'>Tanggal Posting: {formatDate(product.created_at)}</p>
                    </div>
                  </div>

                  {/* Image gallery */}
                  <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                    <div className="bg-black p-4 rounded-md lg:col-span-2  lg:border-gray-200 lg:pr-8">
                      <div className='w-full'>
                            <Slide>
                              {
                                product.images.map((img, i) => {
                                  return (
                                    <div className="each-slide flex justify-center" key={i}>
                                      <img
                                        src={`http://otomobilku.id/storage/${selectedImage?.path}`}
                                        className="object-center object-fill rounded-md"
                                        style={{
                                          maxHeight: "350px"
                                        }}
                                      />
                                    </div>
                                  )
                                })
                              }
                            </Slide>
                          {/* </div> */}
                      </div>
                      <div className="lg:col-span-2 lg:pr-8 mt-4">
                        <div className='flex w-full overflow-y-auto'>
                          {
                            product.images.map((img, i) => {
                              return (
                                <img
                                  key={i}
                                  src={`http://otomobilku.id/storage/${img.path}`}
                                  className="w-52 object-center object-cover mr-3 rounded-md cursor-pointer"
                                />
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>

                    {/* Product Information */}
                    <div className='font-bold'>
                        <div className='grid grid-cols-2 gap-10 p-4 border-b'>
                          <div className='text-left'>
                            <div className='flex'>
                              <img className='w-8 h-8' src='http://otomobilku.id/storage/images/gasoline-pump.png' />
                              <div className='ml-2 text-center'>{product.fuel.fuel_name}</div>
                            </div>
                          </div>
                          <div className='text-right'>
                            <div className='flex justify-end'>
                              <img className='w-8 h-8' src='http://otomobilku.id/storage/images/gear.png' />
                              <div className='ml-2'>{product.transmission.transmission_name}</div>
                            </div>
                          </div>
                        </div>
                        <div className='my-2'>
                          <div className='grid grid-cols-2 gap-10 p-4 border-b'>
                            <div className='text-left'>
                              <img className='w-8 h-8' src='http://otomobilku.id/storage/images/racing.png' />
                            </div>
                            <div className='text-right'>
                              {product.distance} Kilometer
                            </div>
                          </div>
                          <div className='grid grid-cols-2 gap-10 p-4 border-b'>
                            <div className='text-left'>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div className='text-right'>
                              {product.district.district_name}, {product.district.city.city_name}
                            </div>
                          </div>
                          {/* <div className='h-48'> */}
                            {/* Maps Here */}
                          {/* </div> */}
                          <div className='w-full bg-emerald-600 rounded'>
                            <a className='flex justify-center py-2' href={`https://wa.me/${cs_phone}?text=http://ottomobilku.id/items/${product.slug}%0ASaya%20tertarik%20dengan%20mobil%20ini`} target={'_blank'}>
                              <svg className='h-8 w-auto' fill="#ffffff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"/></svg>
                            </a>
                          </div>
                        </div>
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="max-w-2xl mx-auto pb-4 px-4 sm:px-6 lg:max-w-7xl lg:pt-4 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">

                    <div className="lg:pt-4 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-gray-200 lg:pr-8">
                      {/* Description and details */}
                      <div>
                        <h3 className='font-bold text-lg'>Description</h3>
                        <div className="space-y-6 mt-6">
                          <textarea className="w-full h-96 border-none text-base text-gray-900" value={product.description} disabled={true}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            }
          </div>
        </div>
    </Layout>
  )
}

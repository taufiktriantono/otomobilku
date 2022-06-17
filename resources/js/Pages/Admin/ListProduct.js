import React, { useCallback, useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { LocationMarkerIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { months } from '../../utils'
import { Head, useForm } from '@inertiajs/inertia-react';

const params = new URLSearchParams()

export default function ListProduct(props) {
    const listStatus = [
        {
            label: 'semua',
            value: '*'
        },
        {
            label: 'active',
            value: 'active',
            is_active: true,
        },
        {
            label: 'inactive',
            value: 'inactive',
            is_active: false
        }
    ]

    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState({
        limit: 10,
        page: 1,
        status: '',
        created_at: '',
        q: ''
    })

    params.delete('page')
    params.delete('limit')
    params.append('page', value.page)
    params.append('limit', value.limit)

    const handleChange = (e) => {
        const val = e.target.value
        const key = e.target.name
        params.delete(key)
        params.append(key, val)
        setValue((prevState) => {
            return {
                ...prevState,
                [key]: val
            }
        })
        fetchListProducts(params)
    }

    const formatDate = (value) => {
        const d = new Date(value)
        const day = d.getDate()
        const month = d.getMonth()
        const year = d.getFullYear()
        return `${day} ${months[month]} ${year}`
    }

    const loading = () => (
        <tr className=''>
            <th colSpan={4} className='py-4'>
                <div className='flex justify-center'>
                    <svg role="status" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            </th>
        </tr>
    )

    const linkActive = (pos) => {
        if (params.get('page') == pos) {
            return 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
        } else {
            return 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
        }
    }

    const prevPage = () => {
        params.delete('page')
        params.append('page', --page)
        setValue((prevState) => {
            return {
                ...prevState,
                page: --page
            }
        })
        fetchListProducts(params)
    }

    const nextPage = () => {
        setValue((prevState) => {
            return {
                ...prevState,
                page: ++page
            }
        })
        fetchListProducts(params)
    }

    const changePage = (page) => {
        params.delete('page')
        params.append('page', page)
        setValue((prevState) => {
            return {
                ...prevState,
                page: parseInt(page)
            }
        })
        fetchListProducts(params)
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
    }, [setProducts])

    useEffect(() => {
        Promise.all([
            fetchListProducts(params)
        ]).then(() => setIsLoading(false))
    }, [fetchListProducts]);

    return (
        <Dashboard auth={props.auth} header={props.header} errors={props.errors}>
            <Head title="List Product" />
            <div className="relative overflow-x-auto">
                <div className='w-full flex justify-between'>
                    <div className='text-lg text-gray-700 font-bold'>List Product</div>
                    <a href={route('store:product')} className='bg-indigo-700 py-1 px-2 rounded-md text-white'>Add Product</a>
                </div>
                <div className='w-full mt-2 flex text-gray-700'>
                    <div>
                        <label>Date</label>
                        <input className='rounded border-gray-400' type={'date'} name='created_at' value={value.created_at} onChange={handleChange} />
                    </div>
                    <div className='w-full ml-4'>
                        <label>Search</label>
                        <input className='w-full rounded border-gray-400' type={'search'} name='q' value={value.q} onChange={handleChange} placeholder='Merk Mobil/Model Mobil/Tahun'/>
                    </div>
                    <div className='ml-4'>
                        <label>Status</label>
                        <select className='rounded border-gray-400' name='status' value={value.status} onChange={handleChange} >
                            {
                                listStatus.map((status) => {
                                    return (
                                        <option key={status.label} id={status.label} value={status.value} >{status.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <table className="w-full mt-4 text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                        <th scope="col" className="px-6 py-3">
                        Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Product Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? loading() : (
                            products.data.map((product, i) => {
                                return (
                                    <tr key={product.id} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <img
                                                src={product?.images.length > 0 ? `http://admin.otomobilku.id/storage/${product?.images[0].path}` : 'https://apollo-singapore.akamaized.net/v1/files/5lkbvosxkfc61-ID/image;s=780x0;q=60'}
                                                className="w-20 h-10 object-center object-cover "
                                            />
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className='flex'>
                                                <span><LocationMarkerIcon width={16} height={16} /></span>
                                                <span className='font-bold'>{product.district.district_name}</span>
                                            </div>
                                            <div className='text-xs italic'>Post Date: {formatDate(product.created_at)}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={route('get:product', {slug: product.slug})}>
                                                <span className='font-bold'>{product.name}</span>
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold px-2 py-1 text-xs text-white bg-${product.is_active ? 'indigo' : 'gray'}-700 rounded-full`}>{product.is_active ? 'active' : 'inactive'}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href={route('update:product', {
                                                slug: product.slug
                                            })} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
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
                        {
                            !isLoading ? (
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{products.from}</span> to <span className="font-medium">{products.to}</span> of{' '}
                                    <span className="font-medium">{products.total}</span> results
                                </p>
                            ) : null
                        }
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            {
                                !isLoading ? products.links.map((link, i) => {
                                    if (i == 0) {
                                        // return (
                                        //     <div
                                        //         key={i}
                                        //         className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                                        //         >
                                        //         <span className="sr-only">Previous</span>
                                        //         <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                        //     </div>
                                        // )
                                    } else if (products.links.length === i+1) {
                                        // return (
                                        //     <div
                                        //         key={i}
                                        //         className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                                        //     >
                                        //     <span className="sr-only">Next</span>
                                        //         <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                        //     </div>
                                        // )
                                    } else {
                                        return (
                                            <span key={i} onClick={() => changePage(link.label)} aria-current="page" className={linkActive(i)}>{link.label}</span>
                                        )
                                    }
                                }) : null
                            }
                        </nav>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}

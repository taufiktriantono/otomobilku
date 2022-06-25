import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { ArchiveIcon, ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, CogIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';

export default function Dashboard(props) {

    const [open, setOpen] = useState(false)

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='flex'>
                        <div>
                            <aside className="w-64" aria-label="Sidebar">
                                <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded">
                                    <ul className="space-y-2">
                                        <li>
                                            <a href={route('dashboard')} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-700">
                                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                            <span className="flex-1 ml-3 text-gray-500 hover:text-white">Product</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={route('list-permintaan')} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-700">
                                            <ArchiveIcon className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                            <span className="flex-1 ml-3 text-gray-500 hover:text-white">Permintaan Jual Mobil</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={() => setOpen(!open)} href={'#'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-700">
                                                <CogIcon className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                                <span className="flex-1 ml-3 text-gray-500 hover:text-white">Configuration</span>
                                                {open ? (
                                                    <ChevronDownIcon className='flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                                ) : (
                                                    <ChevronRightIcon className='flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                                )}
                                            </a>
                                            {open ? (
                                                <Transition
                                                    show={open}
                                                    enter="transition-opacity duration-75"
                                                    enterFrom="opacity-0"
                                                    enterTo="opacity-100"
                                                    leave="transition-opacity duration-150"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <ul className='space-y-2 ml-4'>
                                                        <li>
                                                            <a href={route('setting-brand')} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-700">
                                                                <ArrowRightIcon className='flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                                                <span className="flex-1 ml-3 text-gray-500 hover:text-white">Brands</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href={route('setting-model')} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-700">
                                                                <ArrowRightIcon className='flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                                                <span className="flex-1 ml-3 text-gray-500 hover:text-white">Models</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </Transition>
                                            ) : null
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                        <div className='w-full ml-4'>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

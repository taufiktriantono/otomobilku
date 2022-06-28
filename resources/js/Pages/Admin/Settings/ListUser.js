import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { Head, useForm } from "@inertiajs/inertia-react";
import { useState } from "react";
import Dashboard from "../Dashboard";


export default function ListUser(props) {

  const { users } = props
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData, get } = useForm({
    limit: 10,
    page: 1,
  })

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
      if (data.page == pos) {
          return 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
      } else {
          return 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
      }
  }

  const prevPage = () => {
      setData((prevState) => {
          return {
              ...prevState,
              page: --page
          }
      })
  }

  const nextPage = () => {
      setData((prevState) => {
          return {
              ...prevState,
              page: ++page
          }
      })
  }

  const changePage = (page) => {
      setData((prevState) => {
          return {
              ...prevState,
              page: parseInt(page)
          }
      })
  }

  return (
    <Dashboard auth={props.auth} header={props.header} errors={props.errors}>

      <Head title="Daftar Pengguna" />
      <div className='w-full flex justify-between text-gray-700 space-x-2'>
        <div className="self-center text-lg font-bold">List User</div>
        <div>
          <a href={route('store-user')} className={'py-2 px-4 self-end bg-indigo-700 rounded-md text-white'} >
            Add User
          </a>
        </div>
      </div>
      <div>
      <table className="w-full mt-4 text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
        </thead>
        <tbody>
          {users.data.map((user, i) => {
            return (
              <tr key={user.id} className="bg-white border-b">
                <td className="px-6 py-4">{user?.id}</td>
                <td className="px-6 py-4">{user?.email}</td>
              </tr>
            )
          })}
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
                              Showing <span className="font-medium">{users.from}</span> to <span className="font-medium">{users.to}</span> of{' '}
                              <span className="font-medium">{users.total}</span> results
                          </p>
                      ) : null
                  }
              </div>
              <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      {
                          !isLoading ? users.links.map((link, i) => {
                              if (i == 0) {
                                  return (
                                      <div
                                          key={i}
                                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                                          >
                                          <span className="sr-only">Previous</span>
                                          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                      </div>
                                  )
                              } else if (users.links.length === i+1) {
                                  return (
                                      <div
                                          key={i}
                                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                                      >
                                      <span className="sr-only">Next</span>
                                          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                      </div>
                                  )
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
  )

}
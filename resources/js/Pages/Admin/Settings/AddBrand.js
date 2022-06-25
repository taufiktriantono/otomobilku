import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "@heroicons/react/outline";
import { Head, useForm } from "@inertiajs/inertia-react";
import { set } from "lodash";
import { useCallback, useEffect, useState } from "react";
import Dashboard from "../Dashboard";

export default function ListBrand(props) {

  const { action, brand } = props

  const { data, setData, post } = useForm(brand != undefined ? brand : null)
  const [open, setOpen] = useState(action != 'store' && action != 'update')
  const [model, setModel] = useState(brand != undefined && brand.models.length > 0 ? brand.models.map((m) => m.name) : [''])

  const handleChange = (e) => {
    setOpen((prev) => {
      return !open
    })
  }

  const handleChangeModel = (e) => {
    model[e.target.name] = e.target.value
    setModel((prev) => {
      return [...model]
    })
  }

  const handleAddModel = (e) => {
    model.push('')
    setModel((prev) => {
      return [...model]
    })
  }

  const handleRemovedModel = (i) => {

  }

  const submit = () => {

  }

  return (
    <Dashboard auth={props.auth} header={props.header} errors={props.errors}>
      <Head title="Daftar Brand Mobil" />
      <div className='w-full flex justify-between text-gray-700 space-x-2'>
        <div className="self-center text-2xl font-bold py-4">
          {action == 'store' ? 'Add' : action == 'update' ? 'Edit' : 'Show'} Brand</div>
      </div>
      <form className="w-1/2 space-y-2 bg-white p-4 rounded-md" onSubmit={action == 'store' ? submit : null}>
        <div className="">
          <Label value={"Brand Name"} className={'mb-2'}/>
          <Input className={'w-full'} required={true} disabled={action == 'show'} value={data.name}/>
        </div>
        <div className="">
          <input
                name="add-model"
                type={"checkbox"}
                className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mr-2"
                value={open}
                checked={open}
                disabled={action != 'store' && action != 'update'}
                onChange={handleChange}
            />
          <span className="text-sm">{action == 'store' ? 'Add' : action == 'update' ? 'Edit' : 'Show'} Model</span>
        </div>
        {open ?
          <div className="space-y-2">
            <div className="text-sm font-bold text-gray-500">Model</div>
            <div className="space-y-2">
              {model.map((m, i) => {
                return (
                  <div key={i} className="flex justify-start">
                    <input type={'text'} name={i} className={'border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'} value={m} onChange={handleChangeModel} required disabled={action == 'show'}/>
                    {
                      action == 'store' || action == 'update' ? (
                        <button type="button" className="self-center px-2 py-1" onClick={handleRemovedModel}>
                          <TrashIcon className="w-6 h-6 text-gray-500" />
                        </button>
                      ) : null
                    }
                  </div>
                )
              })}
            </div>
            {
              action == 'store' || action == 'update' ? (
                <div>
                  <button type="button" className="px-2 py-1 bg-indigo-500 rounded text-white" onClick={handleAddModel}>Add Model</button>
                </div>
              ) : null
            }
          </div> : null
        }
        <div>
          {
            action == 'store' ? (
              <Button className="bg-indigo-500 font-bold mt-2">
                Save
              </Button>
            ) : null
          }
        </div>
      </form>

    </Dashboard>
  )

}
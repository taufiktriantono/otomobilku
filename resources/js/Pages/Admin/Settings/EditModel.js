import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "@heroicons/react/outline";
import { Head, useForm } from "@inertiajs/inertia-react";
import { pullAt, set } from "lodash";
import { useCallback, useEffect, useState } from "react";
import Dashboard from "../Dashboard";

export default function EditModel(props) {

  const { action, model } = props

  const { data, setData, put, processing } = useForm(model != undefined ? model : null)
  const [open, setOpen] = useState(action == 'store' || action == 'update' || action == 'show')
  const [variant, setVariant] = useState(model != undefined && model.variants.length > 0 ? model.variants.map((m) => {
    return {'model_id': model.id, 'name': m.name}
  }) : [{model_id: model != undefined ? model.id : '', name: ''}])

  const handleChange = (e) => {
    setOpen((prev) => {
      return !open
    })
  }

  const handleChangeModel = (e) => {
    variant[e.target.name]['name'] = e.target.value
    setVariant((prev) => {
      return [...variant]
    })
    setData((prev) => {
      return {
        ...prev,
        variants: variant
      }
    })
  }

  const handleAddModel = (e) => {
    variant.push({name: ''})
    setVariant((prev) => {
      return [...variant]
    })
    setData((prev) => {
      return {
        ...prev,
        variants: variant
      }
    })
  }

  const handleRemovedModel = (i) => {

  }

  const submit = () => {
    console.log('SUBMIT ', data)
  }

  const update = () => {
    put(route('update-model', model.id))
  }

  return (
    <Dashboard auth={props.auth} header={props.header} errors={props.errors}>
      <Head title="Daftar Brand Mobil" />
      <div className='w-full flex justify-between text-gray-700 space-x-2'>
        <div className="self-center text-2xl font-bold py-4">
          {action == 'store' ? 'Add' : action == 'update' ? 'Edit' : 'Show'} Model</div>
      </div>
      <form className="w-1/2 space-y-2 bg-white p-4 rounded-md" onSubmit={action == 'store' ? submit : update}>
        <div className="">
          <Label value={"Model Name"} className={'mb-2'}/>
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
          <span className="text-sm">{action == 'store' ? 'Add' : action == 'update' ? 'Add' : 'Show'} Variant</span>
        </div>
        {open ? 
          <div className="space-y-2">
            <div className="text-sm font-bold text-gray-500">Variant</div>
            <div className="space-y-2">
              {variant.map((v, i) => {
                return (
                  <div key={i} className="flex justify-start">
                    <input type={'text'} name={i} className={'border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'} value={v.name} onChange={handleChangeModel} required disabled={action == 'show'}/>
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
              action == 'store' || action == 'update' ?
              (
                <div>
                  <button type="button" className="px-2 py-1 bg-indigo-500 rounded text-white" onClick={handleAddModel}>Add Model</button>
                </div>
              ) : null
            }
          </div> : null
        }
        <div className="flex">
          {
            action == 'store' || action == 'update' ? (
              <>
                <Button className="bg-gray-500 font-bold mt-2 mr-2" disabled={processing}>
                  <a href={route('setting-show-model', model.id)}>Back</a>
                </Button>
                <Button className="bg-indigo-500 font-bold mt-2" disabled={processing}>
                  Save
                </Button>
              </>
            ) : <a href={route('setting-update-model', model.id)} className="self-end py-2 px-4 bg-indigo-500 rounded-md text-white">Edit</a>
          }
        </div>
      </form>

    </Dashboard>
  )

}
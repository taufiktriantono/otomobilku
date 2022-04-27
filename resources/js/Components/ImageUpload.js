import React from 'react'

export default function ImageUpload({ onFileChange, files, setFiles }) {

  const removeImage = (position) => {
    const index = files.indexOf(position)
    if (index > -1) {
      files.splice(index, 1)
    }
    setFiles(files)
  }

  return (
    <div className='w-full h-52 rounded border-2'>
      <div className="relative h-52">
            <div className="flex items-center justify-center w-full h-full">
                <div className='absolute top-0 w-full'>
                  <div className='grid grid-cols-4 gap-4'>
                    {
                      files.length > 0 ?
                      files.map((file, i) => {
                        return (
                          <div key={file.path} className='relative p-1 m-2 shadow-md rounded-md'>
                            <svg onClick={() => removeImage(i)} className="w-6 h-6 absolute cursor-pointer" fill="indigo" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <img
                            src={'http://admin.otomobilku.id/storage/' + file.path}
                          />
                          </div>
                        )
                      }) : null
                    }
                  </div>
                </div>
                <label className="flex flex-col w-full h-full">
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
    </div>
  )
}
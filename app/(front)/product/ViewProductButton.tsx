'use client'
import { useState } from 'react'
import ModelViewer from './ModelViewer'

interface ViewProductButtonProps {
  modelLink: string
}

export default function ViewProductButton({ modelLink }: ViewProductButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="ml-4 bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
      >
        View Product
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl relative w-[90vw] h-[90vh] max-w-[1000px] max-h-[800px]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ModelViewer modelLink={modelLink} />
          </div>
        </div>
      )}
    </>
  )
}
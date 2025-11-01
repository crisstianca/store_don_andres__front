import React from 'react'

export const InfoCard = ({title, subTitle, iconTitle='', bgCard='', textCard='' }) => {
  return (
    <div className="bg-white shadow-md p-2 border border-gray-200 rounded-lg h-20 mt-2">
      <div className="flex justify-between items-center">
        <div>
            <span className="text-[12px] sm:text-xs mb-1 sm:mb-2 block text-gray-500 font-medium ">{ title }</span>
            <div className="text-[12px] sm:text-sm text-gray-900 font-medium ">{ subTitle }</div>
        </div>
        <div className={`w-[30px] h-[30px] flex items-center justify-center ${bgCard} rounded-full`} >
          <i className={`${iconTitle} ${textCard} text-xs`}></i>
        </div>
      </div>
    </div>

  )
}

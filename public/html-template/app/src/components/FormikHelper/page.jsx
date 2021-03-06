import React from "react";
import { AiOutlinePlus } from 'react-icons/ai'

function Page({
  name,
  url,
  placeholder,
  accept,
  inputRef,
  onDrop,
  onDragOver,
  onDeleteValue,
  onChangeInput,
  edit
}) {
  return (
    <>
      <div
        draggable="true"
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="relative overflow-hidden w-20 h-20 bg-pink rounded-full mr-3"
      >
        {/* {url && (
          <svg
            onClick={onDeleteValue}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width="18px"
            height="18px"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
          </svg>
        )} */}
        <label className="w-full h-full"   htmlFor={edit ? `id-${name}-2` : `id-${name}`}>
          
          {url ? <img className="w-full h-full"  src={url} alt="" /> :<AiOutlinePlus className='absolute top-0 right-0 bottom-0 left-0 m-[auto] text-white text-[3rem] cursor-pointer' /> }
          <span>{placeholder}</span>
        </label>
      </div>
      <input
        ref={inputRef}
        className='w-0'
        accept={accept}
        type="file"
        id={edit ? `id-${name}-2` : `id-${name}`}
        name={name}
        onChange={onChangeInput}
      />
    </>
  );
}

export default Page;
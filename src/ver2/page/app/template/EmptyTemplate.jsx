function EmptyTemplate() {
  return (
    <div
      className={` lg:w-[1019px] w-[380px] mt-36 border-8 border-pink-300  h-[573px] bg-white rounded-[36px] flex flex-col items-center justify-center`}
    >
      <div className=" flex mb-5">
        <h1 className="text-5xl">
          You don't have any events yet. Let's add a notable event!
        </h1>
      </div>

      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 9a1 1 0 011-1h4V4a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Add Event
      </button>

    </div>
  );
}
export default EmptyTemplate;

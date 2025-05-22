

export default function DesignTipsCard() {
  return (
    <div  className="absolute w-full h-full transition-all duration-500">
<img
  className="object-cover h-full w-[460px] rounded"
  src="/carousel-1.jpg"
  alt="carousel image"
/>

    <div className="block text-start ml-12 left-0 bottom-0 absolute right-[15%] pt-5 pb-5 text-white">
      <div className="inline-block w-8 h-8 mb-4 text-center text-black bg-white bg-center rounded-lg fill-current stroke-none">
        <i className="top-0.75 text-xxs relative text-slate-700 ni ni-camera-compact" />
      </div>
      <h5 className="mb-1 text-white">Get started with Argon</h5>
      <p className="dark:opacity-80">There’s nothing I really wanted to do in life that I wasn’t able to get good at.</p>
    </div>
  </div>
  );
}

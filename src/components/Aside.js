

export default function Aside(props) {


// let uniqueSize = sizes.filter((size, i, arr) => arr.indexOf(size) === i);

  return (
    <>
      <div className="Aside basis-1/6">
        <ul className="flex flex-wrap justify-start items-center" >
          {
            props.allSizes.map(uniqueSize =>
              <li className="bg-stone-300 w-10 h-10 rounded-full m-4 self-center active:bg-violet-700" onClick={()=> props.handleSize(uniqueSize)} >{uniqueSize}</li>
            )
          }
        </ul>
      </div>
    </>
  );
}
import React from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader';

const overideStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    height: "24px"
}

const Buttont: React.FC<{ loader: boolean; text: string }> = ({ loader, text }) => {
    return (
        <button disabled={loader} className='bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3' type="submit">{loader ? <PropagateLoader cssOverride={overideStyle} color="#ffffff" /> : text}</button>
    );
}

export default Buttont
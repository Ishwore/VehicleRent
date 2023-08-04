import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchBox = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const searchHandle = async (e) => {
        // console.warn(search);  
        const key = search;
        navigate(`/search/${key}`)
        // const result = await fetch(`http://localhost:5000/api/product/search/${key}`)
        // const resultData = await result.json();
        // console.log(resultData);
    }
    // import { useHistory } from 'react-router-dom';

    // const SearchBox = () => {
    //     const [keyword, setKeyword] = useState('');
    //     const history = useHistory();

    //     const submitHandler = (e) => {
    //         e.preventDefault();
    //         if (keyword.trim()) {
    //             history.push(`/search/${keyword}`);
    //         } else {
    //             history.push('/');
    //         }
    //     };

    return (
        <div className="pt-2 cursor-pointer ">

            <div className="flex items-center">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="simple-search" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Search vehicle name,category .." required />
                </div>
                <button type="submit" onClick={searchHandle} className="p-2.5 ml-2 text-sm font-medium text-white bg-slate-400 rounded-lg border border-slate-400 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </div>
    )
}
export default SearchBox;
import React from 'react'
import { useRouter } from 'next/navigation'
import { Briefcase, Search } from 'lucide-react';
const SearchComponent = () => {
    const router = useRouter();
    const [location, setLocation] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [showSearchSuggestions, setShowSearchSuggestions] = React.useState(false);
    
    const categories = [
      'Law Enforcement',
      'Administration',
      'Healthcare',
      'Education',
      'Government Jobs',
      'Technology & IT',
      'Government & Public Sector',
      'Healthcare & Medical',
      'Finance & Banking',
      'Education & Training',
      'Engineering',
      'Sales & Marketing',
      'Human Resources',
      'Legal & Compliance',
      'Operations & Management',
      'Customer Service',
      'Design & Creative',
      'Research & Development',
      'Manufacturing',
      'Retail & E-commerce',
      'Transportation & Logistics',
      'Real Estate',
      'Media & Communications',
      'Non-Profit & NGO',
      'Consulting'
    ];
    const [suggestions, setSuggestions] = React.useState<string[]>(categories);

    const fetchSuggestions = (value: string) => {
    try{
      setShowSearchSuggestions(true)
      setCategory(value);
      const filteredSuggestions = categories.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
      if(value !== '')
        {
          setSuggestions(filteredSuggestions.slice(0.8));
        }
        else{
        setShowSearchSuggestions(false)
        setSuggestions(categories);
      }
    }catch(error){
      console.error(error);
    }
  }


  return (
    <div className="flex border-2 lg:w-[33rem] mt-12 items-center px-2 lg:gap-x-3 gap-x-2 h-[74px] rounded-[37px] bg-[#F5F5F5]">

      {/* Search Input */}
      <div className="border-r">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          className="lg:px-2 px-1 bg-[#F5F5F5] lg:w-36 w-24 border-none placeholder:text-sm placeholder-gray-400 focus:outline-none"
        />
      </div>


       {/* <div className="border-r">
        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="lg:px-2 px-1 bg-[#F5F5F5] lg:w-40 w-28 border-none placeholder:text-sm placeholder-gray-400 focus:outline-none"
        >
            <option className='bg-white' value="">Categories</option>
            {categories.map(category => (
            <option className='bg-white' key={category} value={category}>{category}</option>
            ))}
        </select>
        </div> */}
              <div onClick={(e) => e.stopPropagation()} className="relative flex-1 border-r min-w-0">
              <input
                type="text"
                placeholder="What are you looking for?"
                onFocus={()=>setShowSearchSuggestions(true)}
                value={category}
                onChange={(e) => fetchSuggestions(e.target.value)}
                className="lg:px-2 px-1 bg-[#F5F5F5] lg:w-40 w-28 border-none placeholder:text-sm placeholder-gray-400 focus:outline-none"
              />

              {showSearchSuggestions && (
                <div className="absolute top-full w-[200px] left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {suggestions.length > 0 ? (
                  suggestions.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {setCategory(item); setShowSearchSuggestions(false)}}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <span className="text-gray-800">{item}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No item found
                    </div>
                  )}
                </div>
              )}
            </div>

        {/* Find Your Job Button */}
      <button onClick={()=> location && category ? router.push(`/jobs/location/${location.replace(/\s+/g, '-')}?category=${category.replace(/\s+/g,'-').replace('&','@')}`) : location && router.push(`/jobs/location/${location}`)} className="flex items-center lg:gap-1 gap-1 bg-[#8A38EE] text-white lg:px-4 py-4 rounded-[46px] font-semibold shadow-lg shadow-purple-300">
        <span className="lg:text-[16px] text-[10px] lg:w-full w-20">Find Your Job</span>
        <div className="hidden lg:w-[28px] lg:h-[24px] border-2 border-white rounded-full lg:flex justify-center items-center">
          <Search className="w-4 h-4 font-bold" />
        </div>
      </button>

    </div>
  )
}

export default SearchComponent

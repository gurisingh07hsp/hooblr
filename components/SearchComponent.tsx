import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Search } from 'lucide-react';

interface place_data {
  class: string;
  type: string;
  display_place: string;
}

const SearchComponent = () => {
    const router = useRouter();
    const [location, setLocation] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [showSearchSuggestions, setShowSearchSuggestions] = React.useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = React.useState(false);
    const [filteredCities, setFilteredCities] = React.useState<string[]>([]);
    const locationRef = React.useRef<HTMLDivElement>(null);
    
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


      React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (selectedCity: string) => {
    setLocation(selectedCity);
    setShowLocationDropdown(false);
  };

  const handleLocationFocus = () => {
    setShowLocationDropdown(true);
  };

  const handleLocationChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    if(e.target.value !== ' ' && e.target.value !== ''){ 
      try{
        const response = await fetch(
        `https://api.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&q=${e.target.value}&limit=5&dedupe=1&countrycodes=in`
        );
        const data = await response.json();
        console.log(data);
        setFilteredCities(
          data
          ?.filter((place: place_data) => (place.class === "place" || place.class === 'boundary'))
          .map((place: place_data) => place.display_place)
        );
      }catch(error){
        console.error("Error fetching location data: ", error);
      }
    }
    setShowLocationDropdown(true);
  };



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
    <div className="flex border-2 lg:w-[33rem] mt-12 items-center px-2 lg:gap-x-3 gap-x-2 lg:h-[74px] h-[55px] rounded-[37px] bg-[#F5F5F5]">

      {/* Search Input */}

            <div className="relative flex min-w-0" ref={locationRef}>
              <input
                type="text"
                placeholder={"Enter Location"}
                value={location}
                onChange={handleLocationChange}
                onFocus={handleLocationFocus}
                className="lg:px-2 px-1 bg-[#F5F5F5] lg:w-36 w-24 text-[10px] lg:text-[16px] placeholder:lg:text-sm placeholder:text-[10px] border-r placeholder-gray-400 focus:outline-none"
              />
              
              {/* Location Dropdown */}
              {showLocationDropdown && (
                <div className="absolute top-full left-0 border-none right-0 mt-1 w-[130px] lg:w-[200px] bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredCities.length > 0 && (
                    filteredCities.filter((city, index, arr) => arr.indexOf(city) === index).map((city, index) => (
                      <button
                        key={index}
                        onClick={() => handleLocationSelect(city)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <span className="text-gray-800">{city}</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

              <div onClick={(e) => e.stopPropagation()} className="relative flex border-r min-w-0" ref={locationRef}>
              <input
                type="text"
                placeholder="ex. Graphic Designer"
                onFocus={()=>setShowSearchSuggestions(true)}
                value={category}
                onChange={(e) => fetchSuggestions(e.target.value)}
                className="lg:px-2 px-1 bg-[#F5F5F5] lg:w-40 w-28 border-r text-[10px] lg:text-[16px] placeholder:lg:text-sm placeholder:text-[10px] placeholder-gray-400 focus:outline-none"
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

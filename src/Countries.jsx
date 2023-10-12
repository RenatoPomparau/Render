import {useState, useEffect} from 'react'
import axios from 'axios'
const Individual=(props)=>{
    console.log(props.name)
    return(
        <div>
            <p>{props.name}</p>
        </div>
    )
}
const Country=({country})=>{
    // console.log(props.country)
    if(country)
    {  if (country.length>10)
        {
            return(
                <div>
                    be more specific
                </div>)
        }
        if(country.length===1)
        {   
            return(
                <div>
                {country.map(piece=>
                <div> 
                  <img src={piece.flags.png}></img>
                </div>
                )}
                </div>
            )
        }            
        return(
            <div>
            {country.map(piece=>
            <div> 
               <Individual key={piece.name.common} name={piece.name.common}></Individual>
            </div>
            )}
            </div>
        )

    }
 
    return (
        null
    )
       
    
}
const SearchEngine=({search,setSearch})=>{
   
    const handleSearch=(event)=>{
        console.log(event.target.value)
        setSearch(event.target.value)
      } 
      console.log(search)
    return(
        <div>
        country:<input value={search} onChange={handleSearch}></input>
    </div>
    )
}

const filterByName=(item,search)=>{
    return item.name.common.includes(search)
  
    
}
const Countries=() =>{
    const [country,setCountry]=useState(null)
    const [search,setSearch]=useState('')
    // useEffect(()=>{ 
        
    //     if(search)
    //     {
    //         axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    //         .then(response=>{
    //             //response.data.map(name=>console.log(name.name.common))
    //            const countries= response.data.map(name=>name)
    //            setCountry(countries.filter(parameter=>filterByName(parameter,search)))})
            
    //         }
    //     }
                   
        
    // ,[search])
    useEffect(() => {
        if (search) {
          axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
              // Assuming filterByName is a separate function
              const filteredCountries = response.data.filter(country => filterByName(country, search));
              setCountry(filteredCountries);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        }
      }, [search]);

  
    
        return(
            <div>
                <SearchEngine search={search} setSearch={setSearch}></SearchEngine>
                <Country country={country}></Country>
            </div>
        )
    }


export default Countries
import axios from "axios";
import { createContext, useEffect, useState } from "react";




export let CategoriesContext = createContext();

export default function CategoriesContextProvider({ children }) {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);


    async function getCategories() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        setCategories(data.data);
        setLoading(false);
        // console.log(data.data);
    }

    useEffect(() => {
        getCategories()
    }, [])
    return <CategoriesContext.Provider value={{ categories, loading }}>
        {children}
    </CategoriesContext.Provider>
}
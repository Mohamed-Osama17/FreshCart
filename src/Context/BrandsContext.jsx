import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useParams } from "react-router-dom";





export let BrandsContext = createContext();


export default function BrandsContextProvider({ children }) {

    const [brands, setBrands] = useState([]);
    const [brandDetails, setBrandDetails] = useState([]);
    const [brandProducts, setBrandProducts] = useState(null);
    const [loading, setLoading] = useState(true);


    //*===> Get All Brands Function
    async function getBrands() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
            // console.log(data.data);
            setBrands(data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    //*===> Get All Specific Details
    async function getSpecificBrand(brandId) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
            // console.log(data.data);
            setBrandProducts(data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    //*===> Get Brand Details
    async function getBrandDetails(brandId) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
            // console.log(data.data);
            setBrandDetails(data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getBrands();
    }, [])


    return <BrandsContext.Provider value={{ brands, setBrands, brandProducts, setBrandProducts, brandDetails, setBrandDetails, getSpecificBrand, getBrandDetails, loading }}>
        {children}
    </BrandsContext.Provider>

}
import {Box} from "@mui/material";
import ProductsList from "./ProductsList";
import ProductAddForm from "./ProductAddForm";
import ShippingMethods from "./ShippingMethods";




const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "80px", 
  marginRight: "80px", 
  gap:"20px"

};



const Dashboard: React.FC = () => {



  return (
    <Box 
    sx={containerStyles}>

      <ProductAddForm />

      <ProductsList />

      <ShippingMethods/>

    </Box>
  );
};

export default Dashboard;

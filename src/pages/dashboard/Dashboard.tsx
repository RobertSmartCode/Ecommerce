import {Box} from "@mui/material";
import ProductsList from "./ProductsList";
import ProductAddForm from "./ProductAddForm";
import ShippingMethods from "./ShippingMethods";




const containerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start", 
  gap: "16px", 
  textAlign: "center",
 
};


const Dashboard: React.FC = () => {



  return (
    <Box sx={containerStyles}>

      <ProductAddForm />

      <ProductsList />

      <ShippingMethods/>

    </Box>
  );
};

export default Dashboard;

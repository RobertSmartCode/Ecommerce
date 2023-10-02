import {Box} from "@mui/material";
import ProductAddForm from "./ProductAddForm";
import ProductsList from "./ProductsList";
import MyOrders from "./MyOrders";
import PaymentMethods from "./PaymentMethods";
import ShippingMethods from "./ShippingMethods";
import StoreData from "./StoreData";



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
      
      <MyOrders />
     
      <PaymentMethods/>

      <ShippingMethods/>

      <StoreData/>


    </Box>
  );
};

export default Dashboard;

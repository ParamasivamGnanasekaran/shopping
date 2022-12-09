const filterByProducts = (arr1, arr2) => {
    let res = [];
    res = arr1.filter(el => arr2.find(element => element.productId === el.id ));
    return res;
 }
 
 const filterByCart = (arr1, arr2) => { 
   let res = [];
   res = arr1.filter(el => {
      return arr2.map(element => {
         if(element.productId === el.id){
           return el.quantity = element.quantity
         }else{
            return null;
         }
      });
   });
   return res;
 }

 module.exports = {filterByCart, filterByProducts}
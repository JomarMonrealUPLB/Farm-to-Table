export const sortBy = (list, key, isAscending) =>{
    const newList = [...list]
    if(isAscending){
        let result = newList.sort(function (a, b) {
            if (a[key] < b[key]) {
              return -1;
            }
            if (a[key] > b[key]) {
              return 1;
            }
            return 0;
          });  
          return result 
    } else{
        let result = newList.sort(function (a, b) {
            if (a[key] > b[key]) {
              return -1;
            }
            if (a[key] < b[key]) {
              return 1;
            }
            return 0;
          });  
          return result 
    }
}


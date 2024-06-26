export const sortBy = (list, key, isAscending) =>{
    const newList = [...list]
    if(isAscending){
        let result = newList.sort(function (a, b) {
            if(key=== "date"){
              return new Date(a.date) - new Date(b.date)
            }
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
            if(key=== "date"){
              return new Date(b.date) - new Date(a.date)
            }
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


export class ProductType{
    static FRUIT = 0;
    static VEGETABLE = 1;
    static HERB = 2;
    static POULTRY = 3;

    static toString = (typeNumber) => {
        if(typeNumber === 1){
            return "Fruit"
        } else if (typeNumber === 2){
            return "Vegetable"
        } else if (typeNumber === 3){
            return "Herb"
        } else if (typeNumber === 4){
            return "Poultry"
        } else {
            return "Other"
        }
    }
}
import {hongkong, nt, kowloon} from '../constants/ImageHandler';


export function availabilityMapper(ids){
    if(ids==null)
        return null;

    var availabilityString="";
    ids.forEach(
        id=>{
            switch(id){
                case 1:
                    availabilityString = availabilityString.concat("Morning, ");
                    break;
                case 2:
                    availabilityString = availabilityString.concat("Lunch, ");
                    break;
                case 3:
                    availabilityString = availabilityString.concat('Tea Time, ');
                    break;
                case 4:
                    availabilityString = availabilityString.concat('Dinner, ');
                    break;
            }
        }
    );
    return availabilityString.substring(0, availabilityString.length-2);
}

export function tasteMapper(ids){
    if(ids==null)
        return null;
    else{
        var tasteString="";
        ids.forEach(
            id=>{
                switch(id){
                    case 1:
                        tasteString = tasteString.concat("spicy, ");
                        break;
                    case 2:
                        tasteString = tasteString.concat("sweet, ");
                        break;
                    case 3:
                        tasteString = tasteString.concat('salty, ');
                        break;
                    case 4:
                        tasteString = tasteString.concat('sour, ');
                        break;
                    case 5:
                        tasteString = tasteString.concat('oily, ');
                        break;
                }
            }
        );
        return tasteString.substring(0, tasteString.length-2);
    }
}

export function imageUrlMapper(location){
    console.log("image mapper");
    console.log(location);
    switch(location){
        case "Hong Kong Island":
            console.log("1")
            return hongkong;
        case "Kowloon":
            console.log("2")

            return kowloon;
        case 'New Territories':
            console.log("3")

            return nt;
        default:
            console.log("4");

    }
}

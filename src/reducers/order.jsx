const order =(state = [],action) => {

        switch(action.type){
    
            case 'ORDER':
            return action.payload
            
            default:
                return state;
        }
}
export default order
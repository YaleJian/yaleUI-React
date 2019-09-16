let dataUtils = {
    isNaN: (value)=>{
        return typeof value === 'number' && !isNaN(value);
    }
};
export default dataUtils;
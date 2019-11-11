import Message from "../message/Message";

let result = (res, func) => {
    if (res.data.code === 10000) {
        func(res.data.data);
    } else {
        console.log(res);
        Message(res.data.msg);
    }
};
export default result;
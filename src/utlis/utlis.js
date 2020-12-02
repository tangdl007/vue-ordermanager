export var getChinaTime = (val)=>{
    //兼容val string，obj格式
    let myDate = typeof val == "string"?new Date(val):val;
    return  myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
}   
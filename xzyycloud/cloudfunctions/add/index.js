// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    // wxContext为微信云函数上下文
    // wxContext内封装了openid appid unionid等参数
    const wxContext = cloud.getWXContext();
    // 客户端调用当前云函数，并且传递的参数,
    // 都将被封装到event对象中,可以直接获取
    let a = event.a; // 获取传过来的参数a
    let b = event.b; // 获取传过来的参数b
    let sum = a + b;

    return {
        openid: wxContext.OPENID,
        sum: sum
    }
}
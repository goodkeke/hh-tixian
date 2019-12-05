import Mock from 'mockjs'

Mock.setup(
    {
        timeout: '200 - 400'
    }
);
//模拟登陆数据
const account = {
    userName: 'jerry',
    password: '123456'
};
const token = '8219UEHIHIDH19';
/**
 * @name 创建mock模拟api
 * **/
Mock.mock('/login','post',({
    body
}) => {
    let data = JSON.parse(body);
    if(data.userName === 'jerry' && data.password === '123456') {
        return {
            retType:1,
            data:{
                ...account,
                token:token
            },
            message:'登录成功'
        }
    }else{
        return {
            retType:2,
            data:null,
            message:'账号或密码错误'
        }
    }
    }
)

var Koa=require('koa'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path=require('path'),
    bodyParser=require('koa-bodyparser'),
    DB=require('./module/mongoDB.js');

var app=new Koa();

// 配置post提交数据的中间件
app.use(bodyParser());

//配置 koa-art-template模板引擎
render(app, {
    // 视图的位置
    root: path.join(__dirname, 'views'),
    // 后缀名
    extname: '.html',
    // 是否开启调试模式
    debug: process.env.NODE_ENV !== 'production'
});

// 查找学员
router.get('/',async (ctx)=>{
    var result=await DB.find('user',{});
    await ctx.render('student',{
        list:result
    });
})

// 增加学员
router.get('/add',async (ctx)=>{
    await ctx.render('add');
})

// 执行增加学员操作
router.post('/doAdd',async (ctx)=>{

    // 获取表单提交的数据
    let data=await DB.insert('user',ctx.request.body);
    try{
        if(data.result.ok){
            ctx.redirect('/')
        }
    }catch(err){
        ctx.redirect('/add');
    }
})

// 编辑学员
router.get('/edit',async (ctx)=>{
    // 获取用户ID
    let id=ctx.query.id;
    let data=await DB.find('user',{"_id":DB.getObjectId(id)});
    // 获取用户信息
    await ctx.render('edit',{
        list:data[0]
    });

})

// 执行编辑学员的操作
router.post('/doEdit',async (ctx)=>{
    // 获取用户信息
    var id=ctx.request.body.id;
    var username=ctx.request.body.username;
    var age=ctx.request.body.age;
    var sex=ctx.request.body.sex;

    let data=await DB.update('user',{"_id":DB.getObjectId(id)},{
        username,age,sex
    })

    try{
        if(data.result.ok){
            ctx.redirect('/')
        }
    }catch(err){
        ctx.redirect('/');
    }
})


// 删除学员
router.get('/delete',async (ctx)=>{
    let id=ctx.query.id;
    var data=await DB.remove('user',{"_id":DB.getObjectId(id)});
    if(data){
        ctx.redirect('/')
    }

})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);


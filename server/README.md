# 系统服务端 server
## 安装
- npm i -g @nestjs/cli
- nest new server
- 更新：yarn upgrade-interactive --latest

## 安装插件
- npm install mongoose @types/mongoose nestjs-typegoose @typegoose/typegoose (typegoose需要依赖nest\mongoose库<a href="https://www.npmjs.com/package/nestjs-typegoose">mongo数据库</a>)
- npm i class-validator --save (<a href="https://www.npmjs.com/package/class-validator">规则校验装饰器</a>)
- npm i nestjs-mongoose-crud (B站大佬的自动生成crud接口以及生成接口文档包-图方便^_^)
- npm i --save @nestjsx/crud @nestjsx/crud-typeorm class-transformer class-validator<a href="https://docs.nestjs.cn/6/recipes?id=crud">crud,目前只支持typeORM数据库</a>

- npm i @nestjs/config 加载环境变量<a href="https://docs.nestjs.com/techniques/configuration">https://docs.nestjs.com/techniques/configuration</a>本项目将会用到的process.env环境变量单独放置在common公共模块中，需要使用的项目只需要在module中引用。由于imports函数是并行执行的，所以在引用时使用环境变量的模块需要使用异步加载（useFactory函数）。
- npm i  bcryptjs(crypto)  @nestjs/passport passport passport-local passport-jwt 做登陆验证（npm i @types/passport @types/passport-local @types/passport-jwt 代码提示）
- npm i @nestjs/jwt  jwt包，返回token

## 使用
直接查看package.json了解.

## 创建模块
- nest g(generate) mo(module)
- 为子项目添加模块 : nest g mo -p admin users (表示在admin这个子项目下添加users模块)
- 为子项目添加控制器 : nest g co -p admin users (表示在admin这个子项目下添加users控制器)

## 生成接口文档
<a href="https://docs.nestjs.cn/6/recipes?id=openapi-swagger"></a>
> 通过装饰器告诉系统你要执行、读取什么数据
  装饰器不能单独存在，它永远都在装饰某个东西
  @body参数装饰器表示从req.body里获取数据 要在他后面增加个变量，告诉人们值要挂在谁的身上.
　同理，想获取query里的东西，用@Query参数装饰器,如：create(@Body() body, @Query() query, @Param() param)
- npm install --save @nestjs/swagger swagger-ui-express
- setup('路径')函数调用接口文档路由
- 使用@api开头的装饰器都属于接口文档的装饰器。
- @ApiProperty属于某个模型的属性
- @ApiModelProperty({ description: '帖子内容' })
- @ApiTags('默认')标记当前下面这个控制器要应用哪个标签
- ApiOperation({ title: '创建帖子', description: 'get帖子的接口' }) 接口名称及描述

## 创建应用
- nest g application(app) 创建应用
- nest g lib db 创建公共模块
- nest g in 创建拦截器
- nest g f 创建filter
## mongoose-api 

1. <a href="https://typegoose.github.io/typegoose/docs/decorators/prop/">@typegoose/typegoose文档</a>
2. 表间关联 Ref<xxx>

## 错误状态码|信息回调方案
> @Res() res
return res.status(HttpStatus.BAD_REQUEST).send({
  errorCode: 10001,
  errorMessage: '用户编号错误'
});
throw new HttpException('用户编号错误', HttpStatus.BAD_REQUEST);
<a href="https://www.jianshu.com/p/ebd80c9c6db1">相关文章</a>
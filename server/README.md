# 系统服务端 server
## 安装
- npm i -g @nestjs/cli
- nest new server

## 使用

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 创建模块
- nest g(generate) mo(module)

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

## Installation

```bash
$ npm install
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

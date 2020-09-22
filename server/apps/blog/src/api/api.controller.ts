import {
  Controller,
  Get,
  Query,
  HttpException,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { Article } from 'libs/db/models/blog/articles.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Category } from 'libs/db/models/blog/category.model';
import { Tag } from 'libs/db/models/blog/tags.model';
import { Gather } from 'libs/db/models/blog/gather.model';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Tourist } from 'libs/db/models/blog/tourist.model';
import { Comment } from 'libs/db/models/blog/comments.model';
@Controller('site')
export class ApiController {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: ReturnModelType<typeof Article>,
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
    @InjectModel(Tag)
    private readonly tagModel: ReturnModelType<typeof Tag>,
    @InjectModel(Gather)
    private readonly gatherModel: ReturnModelType<typeof Gather>,
    @InjectModel(Tourist)
    private readonly touristModel: ReturnModelType<typeof Tourist>,
    @InjectModel(Comment)
    private readonly commentModel: ReturnModelType<typeof Comment>,
  ) {}
  @Get('list')
  @ApiQuery({
    name: 'query',
    type: String,
    required: false,
    description: '按类型查找文章',
  })
  async list(@Query() query) {
    let {
        limit = 10,
        page = 1,
        skip = 0,
        category = '',
        tags = [],
        keyword = '',
      } = query,
      list = [];
    if (skip < 1) {
      skip = (page - 1) * limit;
    }
    let params = {
      draft: 0,
    };
    if (tags.length) {
      params['tags'] = {
        $in: tags,
      };
    }
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      params['title'] = {
        $regex: reg,
      };
    }
    console.log(params);
    list = await this.articleModel
      .find(params, {
        articleContent: 0,
        gather: 0,
      })
      .populate(['category', 'tags'])
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    const errors = { Article: ' not found' };
    const total = await this.articleModel.countDocuments(params);
    if (!list) throw new HttpException({ errors }, 500);
    return {
      code: 0,
      data: { data: list, total },
      message: '获取文章列表成功',
    };
  }
  @Get('find')
  @ApiOperation({ summary: '查找单个文章信息' })
  async findOne(@Query('id') id: String, @Query('uuid') uuid?: String) {
    try {
      console.log(uuid);
      uuid && (await this.settingTourist(uuid, id));
      const res = await this.articleModel
        .findById(id)
        .populate(['category', 'tags', 'gather']);
      return {
        code: 0,
        data: res,
        message: '获取成功',
      };
    } catch (error) {
      return {
        code: -1,
        data: error,
        message: '获取失败',
      };
    }
  }
  @Get('gather')
  @ApiOperation({ summary: '查找所有归档' })
  async findGather() {
    try {
      const res = await this.gatherModel.find().populate('article');
      return {
        code: 0,
        data: res,
        message: '获取成功',
      };
    } catch (error) {
      return {
        code: -1,
        data: error,
        message: '获取失败',
      };
    }
  }
  @Get('articleByGather')
  @ApiOperation({ summary: '查找归属某一归档的文章' })
  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
    description: 'Query options',
  })
  async findArticleByGather(@Query('id') id) {
    try {
      const res = await this.articleModel.find(
        {
          gather: id,
          draft: 0,
        },
        {
          articleContent: 0,
          gather: 0,
          category: 0,
          tags: 0,
        },
      );
      return {
        code: 0,
        data: res,
        message: '获取成功',
      };
    } catch (error) {
      return {
        code: -1,
        data: error,
        message: '获取失败',
      };
    }
  }

  @Get('category')
  @ApiOperation({ summary: '查找分类' })
  async getCategory() {
    const data = await this.categoryModel.find();
    // .populate('articles')
    // .exec(function(err, docs) {
    //   console.log(docs);
    // });
    return {
      code: 0,
      data: data,
      message: '获取列表成功',
    };
  }

  @Get('tags')
  @ApiOperation({ summary: '查找标签' })
  async getTags() {
    const data = await this.tagModel.find();
    return {
      code: 0,
      data: data,
      message: '获取列表成功',
    };
  }

  @Get('comments')
  @ApiOperation({ summary: '获取文章评论' })
  async getComments(@Query('id') id: string) {
    const data = await this.commentModel.find({ articleId: id });
    if (Object.prototype.toString.call(data).slice(8 - 1) === 'Object') {
      return [data];
    }
    const res = data.reduce((total, item: any) => {
      console.log(item._id, item.replyId);
      if (item.status === 1) {
        item.children = [];
        total.push(item);
      } else {
        total.map(i => {
          if (i._id == item.replyId) {
            i.children.push(item);
          }
        });
      }
      return total;
    }, []);
    return data;
  }

  @Post('comments')
  @ApiOperation({ summary: '添加评论' })
  async postComments(@Body() body) {
    try {
      const data = await this.commentModel.create(body);
      if (data) {
        return {
          code: 0,
          data,
          message: '添加评论成功',
        };
      } else {
        return {
          code: 400,
          data,
          message: '添加评论失败',
        };
      }
    } catch (error) {
      return {
        code: 400,
        data: error,
        message: '添加评论失败',
      };
    }
  }

  async settingTourist(uuid, articleId) {
    if (!uuid) return;
    try {
      const tourist = await this.touristModel.findOne({ uuid });
      if (tourist) {
        if (tourist.readed.includes(articleId)) return;
        const update = await this.touristModel.updateOne(
          {
            uuid: uuid,
          },
          {
            $push: { readed: articleId },
          },
        );
      } else {
        this.createTourist(uuid, articleId);
      }
      this.insertArticleView(articleId);
    } catch (error) {}
  }
  /**
   * 创建游客记录 ，为期1周
   */
  createTourist(uuid, articleId) {
    this.touristModel.create({
      uuid: uuid,
      readed: [articleId],
    });
  }
  /**
   * 自增阅读量
   */
  insertArticleView(id) {
    this.articleModel.updateOne(
      { _id: id },
      {
        $inc: { viewCount: +1 },
      },
    );
  }
}

import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Tourist } from 'libs/db/models/blog/tourist.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Article } from 'libs/db/models/blog/articles.model';
const moment = require('moment');
moment.lang('zh-cn');
@ApiTags('访客')
@Controller('tourist')
export class TouristController {
  constructor(
    @InjectModel(Tourist)
    private readonly touristModel: ReturnModelType<typeof Tourist>,
    @InjectModel(Article)
    private readonly articlesModel: ReturnModelType<typeof Article>,
  ) {}

  @Get('list')
  @ApiOperation({ summary: '获取游客访问量记录' })
  async getTouristLits() {
    // 获取最近一周活跃的用户
    const data = await this.touristModel.find({
      createdAt: { $gt: moment().subtract(1, 'weeks') },
    });

    // 所有的访问总数
    const count = await this.touristModel.countDocuments();

    // 最近一周的时间组

    const timeArr = [];
    for (let index = 6; index >= 0; index--) {
      const time = moment()
        .subtract(index, 'days')
        .format('LL');
      timeArr.push(time);
    }

    // 对最近一周的用户数据处理--拿到每日的访问量
    const watchArr = new Array(7).fill(0);
    const nowDate = moment();
    const articleList = {};
    data.map(toursist => {
      const diffDay = moment(toursist.expireTime).diff(nowDate, 'day') + 6;
      if (diffDay > -1 && diffDay < 7) {
        watchArr[diffDay]++;
      }
      toursist.readed.map(art => {
        let _id = String(art);
        if (articleList[_id]) {
          articleList[_id] = articleList[_id] + 1;
        } else {
          articleList[_id] = 1;
        }
      });
    });

    /**
     * 一周内最常被阅读的前5名文章
     * 综合点击总数、排序、再处理
     */
    const moreReadArticlesId = Object.keys(articleList)
      .sort((a, b) => articleList[b] - articleList[a])
      .splice(0, 4);
    const articleNames = await this.getArticleRankName(moreReadArticlesId);
    const resAricleList = moreReadArticlesId.map(item => {
      return {
        _id: item,
        total: articleList[item],
        title: articleNames[item],
      };
    });
    return {
      code: 0,
      data: {
        articles: resAricleList,
        touristChart: {
          weeks: timeArr,
          weekTourists: watchArr,
        },
        nums: {
          tourists: data.length,
          totalTourists: count,
          comments: 0,
        },
      },
      message: '获取首屏数据',
    };
  }
  /**
   * 获取前五名文章的文章title
   * @param articlesArr
   */
  async getArticleRankName(articlesArr) {
    const res = await this.articlesModel.find(
      {
        _id: {
          $in: articlesArr,
        },
      },
      {
        title: 1,
      },
    );
    const titleObj = {};
    res.map(({ _id, title }) => {
      titleObj[_id] = title;
    });
    return titleObj;
  }
}

<template>
  <div id="about-me" class="animate__bounceInDown">
    <div class="title">
      <h1>我的简介</h1>
    </div>
    <div class="content">
      <div>
        <h3>回忆过往</h3>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我很荣幸的成为了百万码农中的一员，时光转瞬即逝，完全没有想到20多年过去了，我也要开始工作赚钱养家了。</span>
        <span>2018年，我与好兄弟志哥一起去某网担任PHP工程师实习，那个时候起，我才明白程序员是在做怎么样的事，才开始懂得原来我们在学校读万卷书，不见得出了门能行万里路，但却也是敲开好公司大门的一纸凭证。</span>
        <span>3月，我在找工作和考研之间，做了选择：考研。我希望在考研不管失败与否，不会丧失的，是不断学习的能力，这也是时代不断进步，技术不断迭代更易，我们无法或缺的能力。现在也知道，我考研失败了。知道成绩的时候已经到了19年，我是时候作出选择了。</span>
        <span>给自己定了半年时间，在这半年内，我要好好学习前端技术，达到能够胜任一份初级开发工程师的地步，并不断进取。我很明白，我是一个念旧的人，我想到一家稳定的公司和一群志同道合的同事们一起进步，那将是多快乐的一件事</span>
        <span>我希望在20年能够完成我人生中第一次跳槽，这一次，我不要再去外包了，我想去一家自研公司，好好待着-。-</span>
      </div>
      <div class="container">
        <div>
          <h3>基本信息</h3>
          <div class="msg-box">
            <ul>
              <li>
                <strong>姓名：</strong>蔡迪
              </li>
              <li>
                <strong>毕业院校：</strong>江西理工大学
              </li>
              <li>
                <strong>专业：</strong>信息与计算科学
              </li>
              <li>
                <strong>毕业时间：</strong>2019年
              </li>
              <li>
                <strong>外语水平：</strong>CET4
              </li>
            </ul>
            <ul>
              <li>
                <strong>职业：</strong>web前端开发工程师
              </li>
              <li>
                <strong>电话：</strong>17330877261
              </li>
              <li>
                <strong>QQ：</strong>380141132
              </li>
              <li>
                <strong>Github：</strong>
                <a href="http://www.github.com/caidix">www.github.com/caidix</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container">
        <h3>工作经历</h3>
        <div class="work-line">
          <div class="work-title">
            <strong>2019年 -- 至今</strong>
            <strong>文思海辉科技有限公司</strong>
            <strong>前端开发工程师</strong>
          </div>
          <div class="work-content">
            <ul>
              <li>
                <strong>工作职责：</strong>负责腾讯云服务Erp平台和腾讯云服务工具的开发、维护、重构。
              </li>
              <li>
                <strong>技术使用：</strong>Vue全家桶 + elementUI/内部Ui库 + 多种如lodash、echarts插件。
              </li>
              <li>
                <strong>主要作为：</strong>参与erp平台部分功能和工具核心模块的重构，使用多种设计模式，完成了许多组件的二次封装，灵活利用mixins、自定义指令等功能，减少代码冗余，增加复用性，
                在书写代码的过程中，严格遵守代码规范，通过husky、eslint进行代码格式的判断，时常code review代码，保证代码的简洁、命名的易读。在维护数百个工具的过程中，提出使用SSR渲染来减少加载时
                使用iframe而产生多次引入文件造成的性能浪费。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes fadeInUp {
  from {
    top: 100%;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
#about-me {
  max-width: 1200px;
  padding: 0 2rem;
  margin: 15vh auto 0;
  font-size: 1rem;
  animation-duration: 1s;
  .title {
    font-weight: normal;
    font-style: normal;
    position: relative;
    animation: fadeInup 1s 0;
    text-align: center;
    color: transparent; /* 将iconfont的颜色改为透明 */
    -webkit-background-clip: text; /* 将背景图的绘画仅作用在文字上 */
    background-image: linear-gradient(
      225deg,
      #4158d0 0%,
      #c850c0 46%,
      #ffcc70 100%
    );
  }
  .content {
    display: flex;
    flex-direction: column;
    h3 {
      font-size: 1.2rem;
      margin: 10px 0;
      border-bottom: 5px solid #f7eccb;
    }
  }
  .container {
    margin-top: 2rem;
    .msg-box {
      display: flex;
      justify-content: space-around;
      strong {
        padding-right: 0.5rem;
      }
      li {
        padding-bottom: 0.5rem;
        &:last-child {
          padding-bottom: 0;
        }
      }
    }
    .work-line {
      padding: 0 2rem;
      .work-title {
        display: flex;
        justify-content: space-around;
        margin-bottom: 1rem;
      }
      .work-content {
        li {
          padding-bottom: 0.5rem;
          &:last-child {
            padding-bottom: 0;
          }
        }
      }
    }
  }
}
@media (max-width: 875px) {
  #about-me {
    margin-top: 3rem;
    .content .container {
      .msg-box {
        flex-direction: column;
        li:last-child {
          padding-bottom: 0.5rem;
        }
      }
      .work-title {
        flex-direction: column;
      }
    }
  }
}
</style>

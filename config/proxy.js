const Koa = require('koa')
const Router = require('koa-router')
const c2k = require('koa2-connect')
const proxy = require('http-proxy-middleware') 

const router = new Router()
router.get('*',
  c2k(
    proxy({
      target: 'https://zhsj.bnuz.edu.cn/ComprehensiveSys',
      changeOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': 'https://zhsj.bnuz.edu.cn',
      }
    })
  )
)

const app = new Koa()
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'https://zhsj.bnuz.edu.cn');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Headers', 'x-requested-with, Content-Type , Authorization');
  ctx.set('Content-Type', 'application/json;charset=UTF-8');

  await next();
 });
app.use(router.routes())

app.listen(3002, () => {
  console.log(`Server started on 3002`)
})
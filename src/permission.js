/**Created by xiaoqi on 2019/3/16*/
import router from './router'
router.beforeEach((to,from,next)=>{
    window.document.title = to.meta.title;
    next();
});

router.afterEach(()=>{
    window.scrollTo(0,0);
});
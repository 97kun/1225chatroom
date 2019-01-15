// 组件引入
import Index from '../components/index';
import Home from '../components/home';
import First from '../components/first'
import Login from '../components/login';
import Register from '../components/register';
import Me from '../components/me';
import Chatroomlist from '../components/chatroomlist';
import Chatwindow from '../components/chatwindow';
import Test from '../components/test';
import Adminlist from '../components/adminList';
import Editchatroom from '../components/editchatroom';
import Addnews from '../components/addnews';
import Newslist from '../components/newslist';
import NewsDigital from '../components/newsdigital';
import AutoTalk from '../components/autotalk';




export default  [
    {path: "/", component: Index},
    {path: "/Test", component: Test},
    {
        path: "/Home", component: Home,
        redirect: '/Adminlist',
        meta: {
            title: "管理员"
        },
        children: [
            {path: '/Adminlist', component: Adminlist},
            {path: '/Addnews', component: Addnews}
        ]
    },
    {path: '/Editchatroom', component: Editchatroom, name: 'Editchatroom'},
    {
        path: "/First", component: First,
        redirect: '/Login',
        meta: {
            title: "登录注册"
        },
        children: [
            {path: "/Login", component: Login},
            {path: "/Register", component: Register}
        ]
    },
    {path: "/Me", component: Me},
    {path: "/Chatroomlist", component: Chatroomlist},
    {path: "/AutoTalk", component: AutoTalk},
    {path: "/Chatwindow", component: Chatwindow},
    {path: "/Newslist", component: Newslist},
    {path: "/NewsDigital", component: NewsDigital, name: 'NewsDigital'},
    {path: "*", redirect: '/'}
];
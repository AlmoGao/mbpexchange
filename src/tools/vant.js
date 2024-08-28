import { Empty, Tabs, Tab, Popup, Picker, Circle, Notify, CountDown, Image as VanImage, Progress, Swipe, SwipeItem, Field, Button, NoticeBar, Icon, Dialog, Popover, ActionSheet } from 'vant';

import 'vant/lib/index.css';


export default app => {
    app.use(Empty);
    app.use(Tabs);
    app.use(Tab);
    app.use(Popup);
    app.use(Picker);
    app.use(Circle);
    app.use(Notify);
    app.use(CountDown);
    app.use(VanImage);
    app.use(Progress);
    app.use(Swipe);
    app.use(SwipeItem);
    app.use(Field);
    app.use(Button);
    app.use(NoticeBar);
    app.use(Icon);
    app.use(Dialog);
    app.use(Popover);
    app.use(ActionSheet);
}
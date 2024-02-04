
import { Layout } from '@/router/constant';
import { BorderOuterOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';
const routes = [
    {
        path: '/directive',
        name: 'directive',
        component: Layout,
        meta: {
            sort: 9,
            isRoot: true,
            activeMenu: 'directive_index',
            icon: renderIcon(BorderOuterOutlined),
        },
        children: [
            {
                path: 'index',
                name: `directive_index`,
                meta: {
                    title: '指令示例',
                    activeMenu: 'directive_index',
                },
                component: () => import('@/views/directive/index.vue'),
            },
        ],
    },
];
export default routes;

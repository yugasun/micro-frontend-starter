export const apps = [
    {
        name: 'subapp1',
        type: 'vue',
        devEntry: 'http://localhost:8001',
        entry: 'http://localhost:8001',
        container: '#subapp-container',
        activeRule: '/subapp1/',
    },
    // FIXME: can not load subapp4 with subapp1 in the same time
    // {
    //     name: 'subapp4',
    //     type: 'vue',
    //     devEntry: 'http://localhost:8004',
    //     entry: 'http://localhost:8004',
    //     container: '#subapp-container',
    //     activeRule: '/subapp1/',
    // },
    {
        name: 'subapp2',
        type: 'react',
        devEntry: 'http://localhost:8002',
        entry: 'http://localhost:8002',
        container: '#subapp-container',
        activeRule: '/subapp2/',
    },
    {
        name: 'subapp3',
        type: 'svelte',
        devEntry: 'http://localhost:8003',
        entry: 'http://localhost:8003',
        container: '#subapp-container',
        activeRule: '/subapp3/',
    },
];

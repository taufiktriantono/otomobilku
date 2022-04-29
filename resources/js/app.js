require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { Inertia } from '@inertiajs/inertia'
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        return render(<App {...props} />, el);
    },
});

Inertia.on('navigate', (event) => {
    gtag('event', 'page_view', {
     'page_location': event.detail.page.url
    });
})

InertiaProgress.init({ color: '#4B5563' });

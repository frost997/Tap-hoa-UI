import type {PageLoad} from "./$types";
import {error} from "@sveltejs/kit";

export const load: PageLoad = ({params}) => {
    if (params.slug === 'hello-world') {
        return {
            title: 'Hello world!',
            content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
        };
    }

    error(404, 'Not found');
};
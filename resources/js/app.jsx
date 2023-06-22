import "./bootstrap";
import "../css/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import Admin from "./Layouts/AdminLayout";
import Auth from "./Layouts/AuthLayout";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => (title ? `${title} | ${appName}` : appName),
    resolve: async (name) => {
        let page = await resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        );

        name.startsWith("Admin/") &&
            (page.default.layout =
                page.default?.layout || ((page) => <Admin children={page} />));
        page.default.layout =
            page.default?.layout || ((page) => <Auth children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});

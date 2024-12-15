import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
      return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
      const root = createRoot(el);

      root.render(<App {...props} />);
    },
  })
);

import ReactDOMServer from "react-dom/server";

export function jsxToHtmlElement(jsx: JSX.Element) {
	const html = ReactDOMServer.renderToStaticMarkup(jsx);
	const container = document.createElement("div");
	container.innerHTML = html;
	return container.firstChild as Node;
}

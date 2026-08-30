import type { Response } from "express";


export async function sendAuthResponse(
    res: Response,
    authResponse: globalThis.Response,
): Promise<void> {
    const setCookie = authResponse.headers.getSetCookie();
    if (setCookie.length > 0) {
        res.setHeader("set-cookie", setCookie);
    }

    const contentType = authResponse.headers.get("content-type");
    if (contentType) {
        res.setHeader("content-type", contentType);
    }

    const body = await authResponse.text();
    res.status(authResponse.status);

    if (!body) {
        res.end();
        return;
    }

    res.send(body);
}

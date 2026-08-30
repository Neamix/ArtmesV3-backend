import { fileURLToPath } from "node:url";

/**
 * The logo travels with the message as an inline attachment referenced by
 * `cid:`, rather than a hosted URL. A URL would need a publicly reachable host
 * (localhost is invisible to a real inbox) and most clients block remote images
 * by default; an embedded part renders immediately everywhere.
 */
export const LOGO_CID = "artmes-logo@artmes";

export const LOGO_SRC = `cid:${LOGO_CID}`;

export const logoAttachment = {
    filename: "logo.png",
    path: fileURLToPath(new URL("../../public/Logos/logo.png", import.meta.url)),
    cid: LOGO_CID,
};

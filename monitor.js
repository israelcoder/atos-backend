import { cleanupPendingUsers } from "./src/utils/cleanupPendingUsers.js";

setInterval(() => {
    cleanupPendingUsers()
}, 1 * 60 * 1000);